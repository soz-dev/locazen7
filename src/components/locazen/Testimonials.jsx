import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchReviews } from "@/lib/rentalsApi";

export default function Testimonials() {
  const { t } = useTranslation();
  const staticItems = t("testimonials.items", { returnObjects: true });
  const [apiItems, setApiItems] = useState(null);

  useEffect(() => {
    fetchReviews()
      .then(data => {
        const voy = Array.isArray(data) ? data.filter(r => r.name?.startsWith("V|")).slice(0, 6) : [];
        if (voy.length > 0) setApiItems(voy);
      })
      .catch(() => {});
  }, []);

  const items = apiItems
    ? apiItems.map(r => ({
        name: r.name.slice(2),
        location: r.location || "",
        rating: r.rating ?? 5,
        text: r.comment,
        initials: r.name.slice(2, 4).toUpperCase(),
      }))
    : staticItems;

  // décalage vertical par colonne : col0=0, col1=56px, col2=28px
  const colOffsets = [0, 56, 28];

  return (
    <section className="py-20 md:py-28 bg-[#0C4A6E] border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("testimonials.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            {t("testimonials.title1")}<br />
            <span className="italic text-[#F59E0B]">{t("testimonials.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start pb-16">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ marginTop: colOffsets[i % 3] }}
              className="relative bg-[#0A3A56] border border-white/10 p-7 hover:border-[#38BDF8]/50 transition-all duration-500 group"
            >
              {/* Guillemet décoratif */}
              <span className="absolute top-3 right-5 font-heading text-8xl text-[#38BDF8]/10 leading-none select-none pointer-events-none group-hover:text-[#38BDF8]/20 transition-colors duration-500">
                "
              </span>

              {/* Étoiles */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: item.rating ?? 5 }).map((_, j) => (
                  <Star key={j} size={11} className="text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>

              {/* Texte */}
              <p className="text-[#F7F5F2]/80 text-sm font-body leading-relaxed mb-7 relative z-10">
                {item.text}
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-9 h-9 bg-[#0891B2] flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-body tracking-wider">{item.initials}</span>
                </div>
                <div>
                  <p className="text-[#F7F5F2] text-sm font-body leading-tight">{item.name}</p>
                  {item.location && (
                    <p className="text-[#38BDF8]/60 text-xs font-body mt-0.5">{item.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note Airbnb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-[#F7F5F2]/40 text-xs font-body tracking-wide mb-3">
            {t("testimonials.airbnb_note")}
          </p>
          <a
            href="https://www.airbnb.fr/users/profile/1469513399317474812"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#38BDF8] text-xs tracking-[0.15em] uppercase font-body hover:text-[#F59E0B] transition-colors"
          >
            {t("testimonials.airbnb_link")}
            <ExternalLink size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

