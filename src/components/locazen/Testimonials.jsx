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

        <div className="max-w-4xl mx-auto space-y-10 mb-14">
          {Array.isArray(items) && items.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: right ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative w-[86%] overflow-hidden rounded-3xl border border-[#1a5a7a] bg-[#0A3A56]/90 p-8 shadow-[0_22px_50px_-18px_rgba(0,0,0,0.55)]"
                style={{ marginLeft: right ? "auto" : "0", marginRight: right ? "0" : "auto" }}
              >
                <Quote className="pointer-events-none absolute -right-2 -top-3 h-24 w-24 text-[#F59E0B]/10" />
                <div className="relative">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: item.rating ?? 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[15px] leading-7 text-white/90 font-body">{item.text}</p>
                  <div className="mt-6 flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-[#0891B2] flex items-center justify-center shrink-0 rounded-md">
                      <span className="text-white text-[9px] font-body tracking-wide">{item.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium tracking-wide text-white font-body">{item.name}</p>
                      {item.location && <p className="text-[#38BDF8]/60 text-xs font-body">{item.location}</p>}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
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

