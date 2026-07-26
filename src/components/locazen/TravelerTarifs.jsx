import React from "react";
import { motion } from "framer-motion";
import { Check, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";

const V = {
  bg:     "bg-white border-t border-[#0C4A6E]/10",
  card:   "bg-[#F0F9FF] border border-[#BAE6FD]",
  divide: "divide-[#BAE6FD]",
  accent: "text-[#0891B2]",
  title:  "text-[#0C4A6E]",
  muted:  "text-[#0C4A6E]/50",
  check:  "text-[#0891B2]",
  btn:    "border border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white",
};

export default function TravelerTarifs() {
  const { t } = useTranslation();
  const services = t("tarifs_v.services", { returnObjects: true });

  return (
    <section id="tarifs" className={`pt-10 pb-20 md:pt-12 md:pb-28 scroll-mt-20 ${V.bg}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves size={13} className={V.accent} />
            <p className={`text-xs tracking-[0.3em] uppercase font-body ${V.accent}`}>
              {t("tarifs_v.eyebrow")}
            </p>
          </div>
          <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light ${V.title}`}>
            {t("tarifs_v.title1")}
          </h2>
          <p className={`mt-3 font-heading italic text-xl md:text-2xl font-light ${V.muted}`}>
            {t("tarifs_v.subtitle")}
          </p>
        </motion.div>

        {/* Carte unifiée */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={V.card}
        >
          <div className={`grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x ${V.divide}`}>
            {services.map((p, i) => (
              <div key={i} className="p-8 md:p-10 flex flex-col">
                <h3 className={`font-heading text-2xl md:text-3xl font-light mb-1 ${V.title}`}>
                  {p.name}
                </h3>
                <p className={`text-xs font-body mb-6 tracking-wide ${V.muted}`}>
                  {p.tagline}
                </p>
                {p.price && (
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-heading text-3xl font-light ${V.title}`}>
                      {p.price}
                    </span>
                    {p.unit && (
                      <span className={`text-base font-heading font-light ${V.muted}`}>
                        {p.unit}
                      </span>
                    )}
                  </div>
                )}
                <ul className="space-y-2.5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-body">
                      <Check size={14} className={`flex-shrink-0 mt-0.5 ${V.check}`} />
                      <span className="text-[#0C4A6E]/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="px-8 md:px-10 py-8 md:py-10 border-t border-[#BAE6FD]">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`block w-full py-4 text-xs tracking-[0.2em] uppercase font-body text-center transition-colors duration-300 min-h-[44px] flex items-center justify-center ${V.btn}`}
            >
              {t("tarifs_v.contactBtn")}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


