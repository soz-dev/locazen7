import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OwnerPricing() {
  const { t } = useTranslation();
  const items = t("ownerPricing.items", { returnObjects: true });

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#F7F5F2] border-t border-[#2D2D2D]/10">
      <div className="max-w-4xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-3">
            {t("ownerPricing.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1A2535] mb-0">
            {t("ownerPricing.title")}
          </h2>
        </motion.div>

        {/* Message distinctif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 pl-5 border-l-2 border-[#C4A96B]"
        >
          <p className="font-heading italic text-lg md:text-xl text-[#1A2535]/75 leading-relaxed">
            {t("ownerPricing.distinction")}
          </p>
        </motion.div>

        {/* Card unifiée — 5 lignes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border border-[#C4A96B]/30 bg-[#FAF8F5]"
        >
          <div className="divide-y divide-[#C4A96B]/15">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 md:gap-10 px-8 md:px-12 py-7 md:py-9"
              >
                {/* Numéro */}
                <span className="font-heading text-3xl md:text-4xl font-light text-[#C4A96B]/30 w-10 flex-shrink-0 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Label + détail */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-2xl md:text-3xl font-light text-[#1A2535] leading-snug mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-body text-[#1A2535]/45 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Prix */}
                <div className="text-right flex-shrink-0 pl-4">
                  <p className="font-heading text-2xl md:text-3xl font-light text-[#C4A96B] leading-none">
                    {item.price}
                  </p>
                  {item.unit && (
                    <p className="text-xs font-body text-[#1A2535]/35 mt-1 whitespace-nowrap">
                      {item.unit}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA dans la card */}
          <div className="px-8 md:px-12 py-7 border-t border-[#C4A96B]/20">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full py-3.5 bg-[#1A2535] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body text-center hover:bg-[#1A2535]/80 transition-colors duration-300 min-h-[44px] flex items-center justify-center"
            >
              {t("ownerPricing.quoteBtn")}
            </a>
          </div>
        </motion.div>

        {/* Note facturation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-start gap-3 mt-8 p-5 bg-[#C4A96B]/8"
        >
          <Sparkles size={16} className="text-[#C4A96B] flex-shrink-0 mt-0.5" />
          <p className="text-[#1A2535]/60 text-sm font-body">
            <span className="font-medium text-[#1A2535]/80">{t("ownerPricing.billing_title")}</span>{" "}
            {t("ownerPricing.billing_detail")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}



