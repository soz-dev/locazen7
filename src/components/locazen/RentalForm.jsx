import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, X, Upload, Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AMENITIES } from "@/components/locazen/amenities";

const empty = {
  name: "", type: "", price: "", beds: 1, baths: 1, guests: 2,
  rating: 4.8, images: [], amenities: [], airbnb_url: "",
  address: "", lat: null, lng: null,
};

function normalizeImages(r) {
  if (!r) return empty;
  let imgs = [];
  try { imgs = typeof r.images === "string" ? JSON.parse(r.images) : (Array.isArray(r.images) ? r.images : []); } catch {}
  if (!imgs.length && r.image) imgs = [r.image];
  return { ...empty, ...r, images: imgs };
}

export default function RentalForm({ rental, onSave, onClose }) {
  const [form, setForm] = useState(rental ? normalizeImages(rental) : empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState({ loading: false, ok: null, city: "" });
  const { toast } = useToast();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const geocodeAddress = async (addr) => {
    if (!addr.trim()) return;
    setGeocoding({ loading: true, ok: null, city: "" });
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1&countrycodes=fr`,
        { headers: { "Accept-Language": "fr", "User-Agent": "Locazen12/1.0" } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setForm((f) => ({ ...f, lat: parseFloat(lat), lng: parseFloat(lon) }));
        const city = display_name.split(",").slice(0, 2).join(", ");
        setGeocoding({ loading: false, ok: true, city });
      } else {
        setGeocoding({ loading: false, ok: false, city: "" });
      }
    } catch {
      setGeocoding({ loading: false, ok: false, city: "" });
    }
  };

  const toggleAmenity = (key) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(key)
        ? f.amenities.filter((a) => a !== key)
        : [...f.amenities, key],
    }));
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const slots = 10 - form.images.length;
    files.slice(0, slots).forEach((file) => {
      if (file.size > 3 * 1024 * 1024) {
        toast({ title: "Image trop lourde (max 3 Mo)", variant: "destructive" });
        return;
      }
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, images: [...f.images, reader.result] }));
        setUploading(false);
      };
      reader.onerror = () => { toast({ title: "Erreur de lecture", variant: "destructive" }); setUploading(false); };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeImage = (idx) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const moveImage = (from, to) => {
    if (to < 0 || to >= form.images.length) return;
    setForm((f) => {
      const imgs = [...f.images];
      [imgs[from], imgs[to]] = [imgs[to], imgs[from]];
      return { ...f, images: imgs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast({ title: "Nom et prix requis", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        image: form.images[0] || "",
        price: Number(form.price),
        beds: Number(form.beds),
        baths: Number(form.baths),
        guests: Number(form.guests),
        rating: Number(form.rating),
      };
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-4 py-3 bg-[#F7F5F2] border border-[#E5E0DA] text-[#2D2D2D] text-sm font-body focus:border-[#8E9B90] focus:outline-none transition-colors";
  const labelCls = "block text-xs tracking-[0.15em] uppercase text-[#2D2D2D]/60 font-body mb-2";

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#2D2D2D]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"

    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-[#F7F5F2] w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#F7F5F2]/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-[#E5E0DA] z-10">
          <h2 className="font-heading text-2xl font-light text-[#2D2D2D]">
            {rental ? "Modifier la location" : "Nouvelle location"}
          </h2>
          <button type="button" onClick={onClose} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Fermer">
            <X size={20} className="text-[#2D2D2D]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photos */}
          <div>
            <label className={labelCls}>Photos ({form.images.length}/10) — la 1ère est la couverture</label>
            <div className="grid grid-cols-3 gap-2">
              {form.images.map((src, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden group border border-[#E5E0DA]">
                  <img src={src} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#C4A96B] text-white text-[9px] px-1.5 py-0.5 font-body leading-tight">Couverture</span>
                  )}
                  <div className="absolute top-1 right-1 flex gap-1">
                    {idx > 0 && (
                      <button type="button" onClick={() => moveImage(idx, idx - 1)} className="p-1 bg-[#2D2D2D]/70 text-[#F7F5F2] text-[10px] font-body leading-none min-w-[24px] min-h-[24px] flex items-center justify-center" title="Déplacer à gauche">←</button>
                    )}
                    <button type="button" onClick={() => removeImage(idx)} className="p-1 bg-[#2D2D2D]/70 text-[#F7F5F2] min-w-[24px] min-h-[24px] flex items-center justify-center">
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {form.images.length < 10 && (
                <label className={`flex flex-col items-center justify-center aspect-square border border-dashed border-[#E5E0DA] cursor-pointer hover:border-[#8E9B90] transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {uploading ? <Loader2 size={20} className="animate-spin text-[#8E9B90]" /> : <Plus size={20} className="text-[#8E9B90]" />}
                  <span className="mt-1 text-[11px] text-[#2D2D2D]/40 font-body">{form.images.length === 0 ? "Ajouter" : "Ajouter"}</span>
                  <input type="file" accept="image/*" multiple onChange={handleAddImage} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Nom *</label>
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="L'Albâtre" />
            </div>
            <div>
              <label className={labelCls}>Type / Localisation</label>
              <input className={inputCls} value={form.type} onChange={(e) => set("type", e.target.value)} placeholder="Appartement · Centre-ville" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Adresse (pour la carte)</label>
            <div className="flex gap-2">
              <input
                className={inputCls + " flex-1"}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                onBlur={(e) => geocodeAddress(e.target.value)}
                placeholder="12 Quai du Général Durand, Sète, 34200"
              />
              <button
                type="button"
                onClick={() => geocodeAddress(form.address)}
                disabled={geocoding.loading}
                className="px-4 py-3 bg-[#2D2D2D] text-[#F7F5F2] text-xs tracking-widest uppercase font-body hover:bg-[#C4A96B] transition-colors min-w-[52px] min-h-[44px] flex items-center justify-center"
              >
                {geocoding.loading ? <Loader2 size={14} className="animate-spin" /> : "OK"}
              </button>
            </div>
            {geocoding.ok === true && (
              <p className="mt-1 text-xs text-emerald-600 font-body">✓ {geocoding.city}</p>
            )}
            {geocoding.ok === false && (
              <p className="mt-1 text-xs text-red-500 font-body">Adresse introuvable — vérifiez la saisie</p>
            )}
            {form.lat && (
              <p className="mt-1 text-[10px] text-[#2D2D2D]/35 font-body">
                📍 {Number(form.lat).toFixed(5)}, {Number(form.lng).toFixed(5)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <label className={labelCls}>Prix / nuit (€) *</label>
              <input type="number" className={inputCls} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="85" />
            </div>
            <div>
              <label className={labelCls}>Chambres</label>
              <input type="number" className={inputCls} value={form.beds} onChange={(e) => set("beds", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Salles de bain</label>
              <input type="number" className={inputCls} value={form.baths} onChange={(e) => set("baths", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Voyageurs</label>
              <input type="number" className={inputCls} value={form.guests} onChange={(e) => set("guests", e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Note (sur 5)</label>
            <input type="number" step="0.1" min="0" max="5" className={inputCls} value={form.rating} onChange={(e) => set("rating", e.target.value)} />
          </div>

          {/* Amenities */}
          <div>
            <label className={labelCls}>Équipements</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map(({ key, label, Icon }) => {
                const active = form.amenities.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleAmenity(key)}
                    className={`flex items-center gap-2 px-4 py-3 border text-sm font-body transition-colors min-h-[44px] ${
                      active ? "bg-[#8E9B90]/15 border-[#8E9B90] text-[#2D2D2D]" : "border-[#E5E0DA] text-[#2D2D2D]/60 hover:border-[#8E9B90]"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-[#8E9B90]" : "text-[#2D2D2D]/40"} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={labelCls}>Lien Airbnb (bouton Réserver)</label>
            <input className={inputCls} value={form.airbnb_url} onChange={(e) => set("airbnb_url", e.target.value)} placeholder="https://www.airbnb.fr/rooms/..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-4 bg-[#2D2D2D] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#8E9B90] transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center"
            >
              {saving ? "Enregistrement..." : rental ? "Enregistrer" : "Ajouter la location"}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-4 border border-[#E5E0DA] text-[#2D2D2D] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#E5E0DA]/40 transition-colors min-h-[44px]">
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
