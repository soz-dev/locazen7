const API_URL = "https://locazen12-api.motastic.workers.dev";
const TOKEN   = "SohanKahyl9434";

const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`,
};

export async function fetchRentals() {
  const res = await fetch(`${API_URL}/rentals`);
  if (!res.ok) throw new Error("Impossible de charger les locations");
  return res.json();
}

export async function createRental(payload) {
  const res = await fetch(`${API_URL}/rentals`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
}

export async function updateRental(id, payload) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
}

export async function deleteRental(id) {
  const res = await fetch(`${API_URL}/rentals/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return res.json();
}

export async function fetchSettings() {
  const res = await fetch(`${API_URL}/settings`);
  if (!res.ok) return {};
  return res.json();
}

export async function updateSetting(key, value) {
  const res = await fetch(`${API_URL}/settings/${key}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du paramètre");
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchAllReviews() {
  const res = await fetch(`${API_URL}/reviews/all`, { headers: authHeaders });
  if (!res.ok) throw new Error("Erreur chargement avis");
  return res.json();
}

export async function submitReview(payload) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur lors de l'envoi");
  return res.json();
}

export async function toggleReviewVisibility(id, visible) {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify({ visible }),
  });
  if (!res.ok) throw new Error("Erreur visibilité");
  return res.json();
}

export async function deleteReview(id) {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  if (!res.ok) throw new Error("Erreur suppression");
  return res.json();
}

export async function createAdminReview(payload) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur création avis");
  return res.json();
}

export async function updateReviewContent(id, payload) {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erreur mise à jour avis");
  return res.json();
}
