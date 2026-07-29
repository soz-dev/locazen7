import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchReviews } from "@/lib/rentalsApi";

export default function Testimonials() {
  const { t } = useTranslation();
  const staticItems = t("testimonials.items", { returnObjects: true });
  const [apiItems, setApiItems] = useState(null);

  useEffect(() => {
    fetchReviews()
      .then(data => {
        const voy = Array.isArray(data) ? data.filter(r => r.type === "voyageur") : [];
        if (voy.length > 0) setApiItems(voy);
      })
      .catch(() => {});
  }, []);

  const items = apiItems
    ? apiItems.map(r => ({
        name: r.name,
        location: r.location || "",
        rating: r.rating ?? 5,
        text: r.comment,
        initials: r.name.slice(0, 2).toUpperCase(),
      }))
    : staticItems;
  return (
    <section className="py-16 md:py-20 bg-[#0C4A6E] border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("testimonials.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            {t("testimonials.title1")}<br />
            <span className="italic text-[#F59E0B]">{t("testimonials.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={item.initials}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating ?? 5 }).map((_, j) => (
                  <Star key={j} size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <Quote size={18} className="text-[#38BDF8]/30 mb-4" />
              <p className="text-[#F7F5F2]/75 text-sm font-body leading-relaxed flex-1 mb-6">
                "{item.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0891B2] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-body tracking-wider">{item.initials}</span>
                </div>
                <div>
                  <p className="text-[#F7F5F2] text-sm font-body">{item.name}</p>
                  <p className="text-[#F7F5F2]/40 text-xs font-body">{item.location}</p>
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
          className="mt-12 text-center"
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
