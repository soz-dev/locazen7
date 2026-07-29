import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Wrench, Eye, EyeOff, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchRentals, createRental, updateRental, deleteRental, fetchSettings, updateSetting, fetchAllReviews, toggleReviewVisibility, deleteReview, createAdminReview, updateReviewContent } from "@/lib/rentalsApi";
import { AMENITIES, getAmenity } from "@/components/locazen/amenities";
import RentalForm from "@/components/locazen/RentalForm";

export default function Admin() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewDraft, setReviewDraft] = useState({ name: "", location: "", rating: 5, comment: "", type: "" });
  const { toast } = useToast();

  const isAdmin = sessionStorage.getItem("locazen_admin") === "true";

  useEffect(() => {
    Promise.all([fetchRentals(), fetchSettings(), fetchAllReviews()])
      .then(([list, settings, revs]) => {
        setRentals(list);
        setMaintenance(settings.maintenance === "true");
        setReviews(revs);
      })
      .catch(() => toast({ title: "Erreur de chargement", variant: "destructive" }))
      .finally(() => { setLoading(false); setReviewsLoading(false); });
  }, []);

  const toggleMaintenance = async () => {
    setMaintenanceLoading(true);
    try {
      const next = !maintenance;
      await updateSetting("maintenance", String(next));
      setMaintenance(next);
      toast({ title: next ? "Maintenance activée" : "Maintenance désactivée" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setMaintenanceLoading(false);
    }
  };

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (r) => { setEditing(r); setShowForm(true); };

  const handleToggleReview = async (r) => {
    try {
      await toggleReviewVisibility(r.id, !r.visible);
      setReviews((prev) => prev.map((x) => x.id === r.id ? { ...x, visible: r.visible ? 0 : 1 } : x));
      toast({ title: r.visible ? "Avis masqué" : "Avis publié" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleDeleteReview = async (r) => {
    if (!confirm(`Supprimer l'avis de « ${r.name} » ?`)) return;
    try {
      await deleteReview(r.id);
      setReviews((prev) => prev.filter((x) => x.id !== r.id));
      toast({ title: "Avis supprimé" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const openCreateReview = (type) => {
    setEditingReview(null);
    setReviewDraft({ name: "", location: "", rating: 5, comment: "", type });
    setShowReviewForm(true);
  };
  const openEditReview = (r) => {
    setEditingReview(r);
    const isVoy = r.name?.startsWith("V|");
    setReviewDraft({ name: isVoy ? r.name.slice(2) : r.name, location: r.location || "", rating: r.rating, comment: r.comment, type: isVoy ? "voyageur" : "proprietaire" });
    setShowReviewForm(true);
  };
  const handleSaveReview = async () => {
    if (!reviewDraft.name.trim() || !reviewDraft.comment.trim()) return;
    const nameToStore = reviewDraft.type === "voyageur" ? `V|${reviewDraft.name}` : reviewDraft.name;
    const payload = { ...reviewDraft, name: nameToStore };
    try {
      if (editingReview) {
        await updateReviewContent(editingReview.id, { ...payload, visible: editingReview.visible });
        setReviews((prev) => prev.map((x) => x.id === editingReview.id ? { ...x, ...payload } : x));
        toast({ title: "Avis mis à jour" });
      } else {
        const created = await createAdminReview({ ...payload, visible: 1 });
        if (created?.id) {
          try { await toggleReviewVisibility(created.id, true); } catch {}
        }
        const newReview = {
          ...payload,
          visible: 1,
          created_at: new Date().toISOString(),
          ...(created && typeof created === "object" ? created : {}),
        };
        setReviews((prev) => [newReview, ...prev]);
        toast({ title: "Avis ajouté et publié" });
      }
      setShowReviewForm(false);
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleSave = async (payload) => {
    try {
      if (editing) {
        const updated = await updateRental(editing.id, payload);
        setRentals((prev) => prev.map((r) => r.id === editing.id ? { ...r, ...payload } : r));
        toast({ title: "Location mise à jour" });
      } else {
        const created = await createRental(payload);
        setRentals((prev) => [created, ...prev]);
        toast({ title: "Location ajoutée" });
      }
    } catch {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" });
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (r) => {
    if (!confirm(`Supprimer « ${r.name} » ?`)) return;
    try {
      await deleteRental(r.id);
      setRentals((prev) => prev.filter((x) => x.id !== r.id));
      toast({ title: "Location supprimée" });
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const propReviews = reviews.filter(r => !r.name?.startsWith("V|"));
  const voyReviews  = reviews.filter(r =>  r.name?.startsWith("V|"));

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Header */}
      <header className="bg-[#2D2D2D] text-[#F7F5F2] px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-[#F7F5F2]/60 hover:text-[#F7F5F2] transition-colors min-h-[44px] px-2">
            <ArrowLeft size={18} />
            <span className="text-xs tracking-[0.2em] uppercase font-body hidden sm:inline">Retour au site</span>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-[#8E9B90] text-[10px] tracking-[0.3em] uppercase font-body">LocaZen · Administration</p>
          <h1 className="font-heading text-2xl font-light">Gestion des locations</h1>
        </div>
        <div className="w-20 hidden sm:block" />
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#2D2D2D]/50 text-sm font-body">
            {rentals.length} location{rentals.length > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={toggleMaintenance}
                disabled={maintenanceLoading}
                className={`flex items-center gap-2 px-4 py-3 text-xs tracking-[0.2em] uppercase font-body transition-colors min-h-[44px] border ${
                  maintenance
                    ? "bg-amber-500 border-amber-500 text-white hover:bg-amber-600"
                    : "border-[#E5E0DA] text-[#2D2D2D]/60 hover:border-[#8E9B90]"
                }`}
              >
                {maintenanceLoading ? <Loader2 size={14} className="animate-spin" /> : <Wrench size={14} />}
                {maintenance ? "Maintenance ON" : "Maintenance OFF"}
              </button>
            )}
            {isAdmin && (
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-6 py-3 bg-[#8E9B90] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#7a8a7c] transition-colors min-h-[44px]"
              >
                <Plus size={16} />
                Ajouter
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#8E9B90]" />
          </div>
        ) : rentals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#2D2D2D]/40 font-body">Aucune location pour le moment.</p>
            {isAdmin && (
              <button onClick={openCreate} className="mt-6 text-[#8E9B90] hover:underline text-sm font-body">
                Ajouter la première location
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[#E5E0DA] overflow-hidden flex flex-col"
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0 bg-[#E5E0DA]/40">
                    {r.image ? (
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-xl font-light text-[#2D2D2D]">{r.name}</h3>
                        <p className="text-[#2D2D2D]/50 text-xs font-body mt-1">{r.type || "—"}</p>
                      </div>
                      <span className="font-heading text-lg text-[#2D2D2D]">{r.price}€<span className="text-xs text-[#2D2D2D]/40">/nuit</span></span>
                    </div>
                    <div className="flex gap-3 mt-3 text-[#2D2D2D]/50 text-xs font-body">
                      <span>{r.beds} ch.</span>
                      <span>{r.baths} sdb</span>
                      <span>{r.guests} voyag.</span>
                      <span className="flex items-center gap-1">★ {r.rating}</span>
                    </div>
                    {r.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.amenities.slice(0, 6).map((key) => {
                          const a = getAmenity(key);
                          if (!a) return null;
                          const Icon = a.Icon;
                          return (
                            <span key={key} className="w-7 h-7 flex items-center justify-center bg-[#8E9B90]/10">
                              <Icon size={13} className="text-[#8E9B90]" />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex border-t border-[#E5E0DA]">
                    <button onClick={() => openEdit(r)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/70 hover:bg-[#E5E0DA]/30 transition-colors min-h-[44px]">
                      <Pencil size={14} /> Modifier
                    </button>
                    <button onClick={() => handleDelete(r)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/70 hover:bg-red-50 hover:text-red-600 transition-colors min-h-[44px] border-l border-[#E5E0DA]">
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <RentalForm
          rental={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {/* Section avis propriétaires */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 border-t border-[#E5E0DA] mt-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#2D2D2D]/50 text-sm font-body">
              {propReviews.length} avis propriétaire{propReviews.length > 1 ? "s" : ""}
            </p>
            <h2 className="font-heading text-2xl font-light text-[#2D2D2D] mt-0.5">Avis propriétaires</h2>
            <p className="text-[#2D2D2D]/40 text-xs font-body mt-1">Soumis par les propriétaires · modération uniquement</p>
          </div>
        </div>
        {reviewsLoading ? (
          <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-[#8E9B90]" /></div>
        ) : propReviews.length === 0 ? (
          <p className="text-[#2D2D2D]/40 font-body text-center py-10">Aucun avis propriétaire pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {propReviews.map((r) => (
              <div key={r.id} className={`bg-white border flex items-start gap-4 p-5 ${
                r.visible ? "border-[#C4A96B]/60" : "border-[#E5E0DA] opacity-60"
              }`}>
                <div className="w-10 h-10 bg-[#C4A96B] flex items-center justify-center shrink-0">
                  <span className="text-[#1A2535] text-xs font-body">{r.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-body text-sm font-medium text-[#2D2D2D]">{r.name}</span>
                    <span className="text-[#C4A96B] text-xs">{"★".repeat(r.rating)}</span>
                    <span className={`text-[10px] font-body px-2 py-0.5 ${
                      r.visible ? "bg-green-100 text-green-700" : "bg-[#E5E0DA] text-[#2D2D2D]/50"
                    }`}>
                      {r.visible ? "Publié" : "Masqué"}
                    </span>
                    <span className="text-[#2D2D2D]/30 text-[10px] font-body">
                      {new Date(r.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-[#2D2D2D]/70 text-sm font-body">{r.comment}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => handleToggleReview(r)} title={r.visible ? "Masquer" : "Publier"} className={`p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors ${
                    r.visible ? "text-green-600 hover:bg-green-50" : "text-[#2D2D2D]/40 hover:bg-[#E5E0DA]/40"
                  }`}>
                    {r.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => handleDeleteReview(r)} className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#2D2D2D]/40 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section avis voyageurs */}}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 border-t border-[#E5E0DA]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#2D2D2D]/50 text-sm font-body">
              {voyReviews.length} avis voyageur{voyReviews.length > 1 ? "s" : ""}
            </p>
            <h2 className="font-heading text-2xl font-light text-[#2D2D2D] mt-0.5">Avis voyageurs</h2>
          </div>
          {isAdmin && (
            <button
              onClick={() => openCreateReview("voyageur")}
              className="flex items-center gap-2 px-5 py-3 bg-[#0891B2] text-white text-xs tracking-[0.2em] uppercase font-body hover:bg-[#0C4A6E] transition-colors min-h-[44px]"
            >
              <Plus size={14} />
              Ajouter
            </button>
          )}
        </div>
        {reviewsLoading ? (
          <div className="flex justify-center py-10"><Loader2 size={24} className="animate-spin text-[#0891B2]" /></div>
        ) : voyReviews.length === 0 ? (
          <p className="text-[#2D2D2D]/40 font-body text-center py-10">Aucun avis voyageur pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {voyReviews.map((r) => (
              <div key={r.id} className={`bg-white border flex items-start gap-4 p-5 ${
                r.visible ? "border-[#0891B2]/60" : "border-[#E5E0DA] opacity-60"
              }`}>
                <div className="w-10 h-10 bg-[#0891B2] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-body">{r.name.slice(2, 4).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-body text-sm font-medium text-[#2D2D2D]">{r.name.slice(2)}</span>
                    <span className="text-[#0891B2] text-xs">{"★".repeat(r.rating)}</span>
                    <span className={`text-[10px] font-body px-2 py-0.5 ${
                      r.visible ? "bg-green-100 text-green-700" : "bg-[#E5E0DA] text-[#2D2D2D]/50"
                    }`}>
                      {r.visible ? "Publié" : "Masqué"}
                    </span>
                    <span className="text-[#2D2D2D]/30 text-[10px] font-body">
                      {new Date(r.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-[#2D2D2D]/70 text-sm font-body">{r.comment}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEditReview(r)} title="Modifier" className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#2D2D2D]/40 hover:text-[#0891B2] hover:bg-blue-50 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleToggleReview(r)} title={r.visible ? "Masquer" : "Publier"} className={`p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors ${
                    r.visible ? "text-green-600 hover:bg-green-50" : "text-[#2D2D2D]/40 hover:bg-[#E5E0DA]/40"
                  }`}>
                    {r.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => handleDeleteReview(r)} className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#2D2D2D]/40 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formulaire avis voyageur */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-light text-[#2D2D2D]">
                {editingReview ? "Modifier l'avis" : reviewDraft.type === "voyageur" ? "Ajouter un avis voyageur" : "Ajouter un avis propriétaire"}
              </h3>
              <button onClick={() => setShowReviewForm(false)} className="p-2 text-[#2D2D2D]/40 hover:text-[#2D2D2D] transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/60 block mb-1.5">Nom</label>
                <input
                  value={reviewDraft.name}
                  onChange={e => setReviewDraft(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-[#E5E0DA] px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0891B2]"
                  placeholder="Marie D."
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/60 block mb-1.5">Ville</label>
                <input
                  value={reviewDraft.location}
                  onChange={e => setReviewDraft(p => ({ ...p, location: e.target.value }))}
                  className="w-full border border-[#E5E0DA] px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0891B2]"
                  placeholder="Paris"
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/60 block mb-1.5">Note</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setReviewDraft(p => ({ ...p, rating: n }))}
                      className={`w-10 h-10 border font-body text-sm transition-colors ${
                        reviewDraft.rating >= n
                          ? "bg-[#F59E0B] border-[#F59E0B] text-white"
                          : "border-[#E5E0DA] text-[#2D2D2D]/40 hover:border-[#F59E0B]"
                      }`}
                    >
                      {n}★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs tracking-[0.15em] uppercase font-body text-[#2D2D2D]/60 block mb-1.5">Commentaire</label>
                <textarea
                  value={reviewDraft.comment}
                  onChange={e => setReviewDraft(p => ({ ...p, comment: e.target.value }))}
                  rows={4}
                  className="w-full border border-[#E5E0DA] px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0891B2] resize-none"
                  placeholder="Le commentaire du voyageur..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveReview}
                className="flex-1 py-3 bg-[#0891B2] text-white text-xs tracking-[0.2em] uppercase font-body hover:bg-[#0C4A6E] transition-colors"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 border border-[#E5E0DA] text-xs tracking-[0.2em] uppercase font-body text-[#2D2D2D]/60 hover:border-[#8E9B90] transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
