import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, X, Upload, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { AMENITIES } from "@/components/locazen/amenities";

const empty = {
  name: "", type: "", price: "", beds: 1, baths: 1, guests: 2,
  rating: 4.8, image: "", amenities: [], airbnb_url: "",
};

export default function RentalForm({ rental, onSave, onClose }) {
  const [form, setForm] = useState(rental ? { ...empty, ...rental } : empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleAmenity = (key) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(key)
        ? f.amenities.filter((a) => a !== key)
        : [...f.amenities, key],
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      set("image", file_url);
      toast({ title: "Photo ajoutée" });
    } catch (err) {
      toast({ title: "Erreur lors de l'envi", variant: "destructive" });
    } finally {
      setUploading(false);
    }
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
    <div className="fixed inset-0 z-[70] bg-[#2D2D2D]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-[#F7F5F2] w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#F7F5F2]/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-[#E5E0DA] z-10">
          <h2 className="font-heading text-2xl font-light text-[#2D2D2D]">
            {rental ? "Modifier la location" : "Nouvelle location"}
          </h2>
          <button onClick={onClose} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Fermer">
            <X size={20} className="text-[#2D2D2D]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photo */}
          <div>
            <label className={labelCls}>Photo</label>
            {form.image ? (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                <button type="button" onClick={() => set("image", "")} className="absolute top-2 right-2 p-2 bg-[#2D2D2D]/80 text-[#F7F5F2] min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center aspect-[16/10] border border-dashed border-[#E5E0DA] cursor-pointer hover:border-[#8E9B90] transition-colors ${uploading ? "opacity-50" : ""}`}>
                {uploading ? <Loader2 size={24} className="animate-spin text-[#8E9B90]" /> : <Upload size={24} className="text-[#8E9B90]" />}
                <span className="mt-2 text-sm text-[#2D2D2D]/50 font-body">Cliquez pour téléverser une photo</span>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            )}
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
