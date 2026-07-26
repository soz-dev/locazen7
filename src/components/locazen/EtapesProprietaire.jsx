import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const O = {
  bg:      "bg-white border-t border-[#1A2535]/8",
  title:   "text-[#1A2535]",
  accent:  "text-[#C4A96B]",
  muted:   "text-[#1A2535]/55",
  divider: "border-[#1A2535]/10",
};

export default function EtapesProprietaire() {
  const { t } = useTranslation();
  const etapes  = t("etapes.items",        { returnObjects: true });
  const pricing = t("ownerPricing.items",  { returnObjects: true });

  return (
    <section id="etapes" className={`py-20 md:py-28 ${O.bg}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14 text-center"
        >
          <p className={`text-xs tracking-[0.3em] uppercase font-body ${O.accent} mb-3`}>
            {t("etapes.eyebrow")}
          </p>
          <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light ${O.title}`}>
            {t("etapes.title1")} <span className="italic">{t("etapes.title2")}</span>
          </h2>
        </motion.div>

        {/* Message distinctif tarifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14 pl-6 border-l-4 border-[#C4A96B]"
        >
          <p className="font-heading italic text-2xl md:text-3xl font-light text-[#1A2535]/80 leading-snug">
            {t("ownerPricing.distinction")}
          </p>
        </motion.div>

        {/* Image zen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-14 overflow-hidden h-64 border border-black"
        >
          <img
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80"
            alt="Sérénité totale"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Steps + prix */}
        <div>
          {etapes.map((etape, i) => {
            const p = pricing[i] || {};
            return (
              <motion.div
                key={i}
                id={`etape-${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className={`flex gap-6 md:gap-12 py-10 md:py-12 border-b ${O.divider} last:border-0`}
              >
                {/* Numéro */}
                <div className="flex-shrink-0 w-12 md:w-20 flex items-start pt-1">
                  <span
                    className="font-heading font-light leading-none select-none"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#C4A96B", opacity: 0.25 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs tracking-[0.25em] uppercase font-body ${O.accent} mb-2`}>
                    Étape {i + 1}
                  </p>
                  <h3 className={`font-heading text-2xl md:text-3xl font-light mb-3 ${O.title}`}>
                    {etape.title}
                  </h3>
                  <p className={`font-body text-sm md:text-base leading-relaxed ${O.muted}`}>
                    {etape.description}
                  </p>
                </div>

                {/* Prix */}
                {p.price && (
                  <div className="flex-shrink-0 text-right flex flex-col items-end justify-center pl-2 min-w-[72px]">
                    <p className="font-heading text-2xl md:text-3xl font-light text-[#C4A96B] leading-none">
                      {p.price}
                    </p>
                    {p.unit && (
                      <p className="text-xs font-body text-[#1A2535]/35 mt-1 whitespace-nowrap">
                        {p.unit}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA + note facturation */}
        <motion.div
          id="tarifs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="block w-full py-4 bg-[#1A2535] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body text-center hover:bg-[#1A2535]/80 transition-colors duration-300 min-h-[44px] flex items-center justify-center"
          >
            {t("ownerPricing.quoteBtn")}
          </a>
          <div className="mt-6 p-6 md:p-8 bg-[#C4A96B]/10 border-l-4 border-[#C4A96B]">
            <p className="font-heading text-xl md:text-2xl font-light text-[#1A2535]/85 leading-snug">
              {t("ownerPricing.billing_title")}<br />
              {t("ownerPricing.billing_detail_1")}<br />
              {t("ownerPricing.billing_detail_2")}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
