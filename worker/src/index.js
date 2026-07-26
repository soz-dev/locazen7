const ALLOWED_ORIGINS = [
  "https://soz-dev.github.io",
  "http://localhost:5173",
  "http://localhost:4173",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function isAuthorized(request, env) {
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${env.API_TOKEN}`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Migration silencieuse : ajout colonne images si manquante
    try { await env.DB.prepare("ALTER TABLE rentals ADD COLUMN images TEXT DEFAULT '[]'").run(); } catch {}
    // Migration silencieuse : table reviews
    try {
      await env.DB.prepare(`CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT '', comment TEXT NOT NULL DEFAULT '',
        rating INTEGER NOT NULL DEFAULT 5, visible INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT ''
      )`).run();
    } catch {}

    // GET /rentals — public
    if (request.method === "GET" && path === "/rentals") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM rentals ORDER BY created_at DESC"
      ).all();
      const rentals = results.map((r) => ({
        ...r,
        amenities: JSON.parse(r.amenities || "[]"),
        images: JSON.parse(r.images || "[]"),
      }));
      return json(rentals, 200, origin);
    }

    // POST /rentals — protégé
    if (request.method === "POST" && path === "/rentals") {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const body = await request.json();
      const id = Date.now().toString();
      await env.DB.prepare(
        `INSERT INTO rentals (id, name, type, price, beds, baths, guests, rating, image, imageY, images, amenities, airbnb_url, address, lat, lng, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        body.name,
        body.type || "",
        Number(body.price),
        Number(body.beds),
        Number(body.baths),
        Number(body.guests),
        Number(body.rating),
        body.image || "",
        body.imageY ?? 50,
        JSON.stringify(body.images || []),
        JSON.stringify(body.amenities || []),
        body.airbnb_url || "",
        body.address || "",
        body.lat ?? null,
        body.lng ?? null,
        new Date().toISOString()
      ).run();
      return json({ id, ...body }, 201, origin);
    }

    // PUT /rentals/:id — protégé
    if (request.method === "PUT" && path.startsWith("/rentals/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      const body = await request.json();
      await env.DB.prepare(
        `UPDATE rentals SET name=?, type=?, price=?, beds=?, baths=?, guests=?,
         rating=?, image=?, imageY=?, images=?, amenities=?, airbnb_url=?, address=?, lat=?, lng=? WHERE id=?`
      ).bind(
        body.name,
        body.type || "",
        Number(body.price),
        Number(body.beds),
        Number(body.baths),
        Number(body.guests),
        Number(body.rating),
        body.image || "",
        body.imageY ?? 50,
        JSON.stringify(body.images || []),
        JSON.stringify(body.amenities || []),
        body.airbnb_url || "",
        body.address || "",
        body.lat ?? null,
        body.lng ?? null,
        id
      ).run();
      return json({ id, ...body }, 200, origin);
    }

    // DELETE /rentals/:id — protégé
    if (request.method === "DELETE" && path.startsWith("/rentals/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      await env.DB.prepare("DELETE FROM rentals WHERE id=?").bind(id).run();
      return json({ deleted: id }, 200, origin);
    }

    // GET /settings — public
    if (request.method === "GET" && path === "/settings") {
      const { results } = await env.DB.prepare("SELECT key, value FROM settings").all();
      const obj = Object.fromEntries(results.map((r) => [r.key, r.value]));
      return json(obj, 200, origin);
    }

    // PUT /settings/:key — protégé
    if (request.method === "PUT" && path.startsWith("/settings/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const key = path.split("/")[2];
      const body = await request.json();
      await env.DB.prepare(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value"
      ).bind(key, String(body.value)).run();
      return json({ key, value: body.value }, 200, origin);
    }

    // GET /reviews — public, visible seulement
    if (request.method === "GET" && path === "/reviews") {
      const { results } = await env.DB.prepare("SELECT * FROM reviews WHERE visible=1 ORDER BY created_at DESC").all();
      return json(results, 200, origin);
    }

    // GET /reviews/all — admin
    if (request.method === "GET" && path === "/reviews/all") {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const { results } = await env.DB.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
      return json(results, 200, origin);
    }

    // POST /reviews — public
    if (request.method === "POST" && path === "/reviews") {
      const body = await request.json();
      if (!body.name?.trim() || !body.comment?.trim()) return json({ error: "name and comment required" }, 400, origin);
      const id = Date.now().toString();
      await env.DB.prepare(
        "INSERT INTO reviews (id, name, comment, rating, visible, created_at) VALUES (?, ?, ?, ?, 0, ?)"
      ).bind(id, body.name.slice(0, 60), body.comment.slice(0, 500), Number(body.rating) || 5, new Date().toISOString()).run();
      return json({ id }, 201, origin);
    }

    // PUT /reviews/:id — admin, toggle visibility
    if (request.method === "PUT" && path.startsWith("/reviews/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      const body = await request.json();
      await env.DB.prepare("UPDATE reviews SET visible=? WHERE id=?").bind(body.visible ? 1 : 0, id).run();
      return json({ id, visible: body.visible }, 200, origin);
    }

    // DELETE /reviews/:id — admin
    if (request.method === "DELETE" && path.startsWith("/reviews/")) {
      if (!isAuthorized(request, env)) return json({ error: "Unauthorized" }, 401, origin);
      const id = path.split("/")[2];
      await env.DB.prepare("DELETE FROM reviews WHERE id=?").bind(id).run();
      return json({ deleted: id }, 200, origin);
    }

    return json({ error: "Not found" }, 404, origin);
  },
};
