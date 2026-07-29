import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchReviews, submitReview } from "@/lib/rentalsApi";

export default function OwnerTestimonials() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews()
      .then(data => setReviews(Array.isArray(data) ? data.filter(r => !r.name?.startsWith("V|")).slice(0, 6) : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast({ title: "Nom et commentaire requis", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitReview(form);
      setSubmitted(true);
      setForm({ name: "", comment: "", rating: 5 });
    } catch {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="avis" className="py-16 md:py-20 bg-[#1A2535] border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">Témoignages</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            Ils nous font<br />
            <span className="italic text-[#C4A96B]">confiance</span>
          </h2>
        </motion.div>

        {/* Avis appRouvés */}
        {!loading && reviews.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4 mb-20">
            {reviews.map((r, i) => {
              const right = i % 2 === 1;
              return (
                <motion.article
                  key={r.id}
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative w-[90%] rounded-xl border border-[#C4A96B]/25 bg-white/5 px-6 py-4 shadow-[0_14px_35px_-12px_rgba(0,0,0,0.55)]"
                  style={{ marginLeft: right ? "auto" : "0", marginRight: right ? "0" : "auto" }}
                >
                  {/* Queue */}
                  <span
                    className="absolute top-5 h-3 w-3 rotate-45 border border-[#C4A96B]/25 bg-[#1f2f41]"
                    style={
                      right
                        ? { right: -6, borderLeft: "none", borderBottom: "none" }
                        : { left: -6, borderRight: "none", borderTop: "none" }
                    }
                  />
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating ?? 5 }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 fill-[#C4A96B] text-[#C4A96B]" />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-[#C4A96B]/60" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/85 font-body mb-3">{r.comment}</p>
                  <div className="border-t border-[#C4A96B]/20 pt-3 flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-[#C4A96B] flex items-center justify-center shrink-0 rounded-sm">
                      <span className="text-[#1A2535] text-[8px] font-body tracking-wide">{r.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-medium text-[#F7F5F2] font-body">{r.name}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Formulaire de soumission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-8">
            Partager votre expérience
          </p>

          {submitted ? (
            <div className="bg-white/5 border border-[#C4A96B]/30 px-8 py-12 text-center">
              <p className="text-[#F7F5F2] font-heading text-2xl font-light mb-2">Merci pour votre avis</p>
              <p className="text-[#F7F5F2]/50 text-sm font-body">Il sera publié après validation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#F7F5F2]/50 font-body mb-2">
                  Votre nom *
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-[#F7F5F2] text-sm font-body focus:border-[#C4A96B] focus:outline-none transition-colors placeholder:text-white/20"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jean D."
                  maxLength={60}
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#F7F5F2]/50 font-body mb-2">
                  Votre avis *
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 text-[#F7F5F2] text-sm font-body focus:border-[#C4A96B] focus:outline-none transition-colors resize-none placeholder:text-white/20"
                  rows={4}
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  placeholder="Mon expérience avec Locazen 7..."
                  maxLength={500}
                />
                <p className="mt-1 text-[10px] text-white/25 font-body text-right">{form.comment.length}/500</p>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#F7F5F2]/50 font-body mb-3">
                  Note
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={n <= form.rating ? "text-[#C4A96B] fill-[#C4A96B]" : "text-white/20"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-4 bg-[#C4A96B] hover:bg-[#B8965A] text-[#1A2535] text-xs tracking-[0.2em] uppercase font-body transition-colors min-h-[44px] disabled:opacity-50"
              >
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Envoyer mon avis
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
