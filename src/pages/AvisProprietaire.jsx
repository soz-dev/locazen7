import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import OwnerReviewCard from "@/components/locazen/OwnerReviewCard";
import SEO from "@/components/SEO";
import { fetchReviews } from "@/lib/rentalsApi";

export default function AvisProprietaire() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews()
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#1A2535]">
      <SEO
        title="Tous les avis propriétaires | Locazen 7"
        description="Découvrez tous les avis des propriétaires et des voyageurs qui font confiance à Locazen 7, conciergerie à Sète."
        canonical="/proprietaire/avis"
      />
      <div className="py-6 px-6 border-b border-white/10">
        <Link to="/proprietaire" className="font-heading text-2xl tracking-[0.2em] font-light text-[#F7F5F2]">
          LOCAZEN 7
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16 md:py-20">
        <Link
          to="/proprietaire#avis"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-[#C4A96B] hover:underline mb-10"
        >
          <ArrowLeft size={14} /> Retour
        </Link>

        <div className="mb-16 text-center">
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">Témoignages</p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            Tous les <span className="italic text-[#C4A96B]">avis</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin text-[#C4A96B]" /></div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-white/50 font-body">Aucun avis pour le moment.</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-10">
            {reviews.map((r, i) => <OwnerReviewCard key={r.id} review={r} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
