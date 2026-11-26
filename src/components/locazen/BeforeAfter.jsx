import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PROPERTIES = [
  {
    id: 1,
    title: "Appartement centre-ville",
    before: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Studio vue mer",
    before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Maison avec terrasse",
    before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
];

function PropertyCard({ prop, index }) {
  const { t } = useTranslation();
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <img
          src={showAfter ? prop.after : prop.before}
          alt={prop.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div
          className={`absolute top-3 left-3 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-body transition-colors duration-500 ${
            showAfter ? "bg-[#C4A96B] text-white" : "bg-[#1A2535]/80 text-[#F7F5F2]/70"
          }`}
        >
          {showAfter ? t("beforeAfter.after") : t("beforeAfter.before")}
        </div>
      </div>

      <h3 className="font-heading text-lg font-light text-[#F7F5F2] mb-4">{prop.title}</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`flex-1 py-2.5 text-[10px] tracking-[0.2em] uppercase font-body transition-colors ${
            !showAfter
              ? "bg-[#F7F5F2]/10 text-[#F7F5F2] border border-[#F7F5F2]/30"
              : "border border-[#F7F5F2]/15 text-[#F7F5F2]/35 hover:border-[#F7F5F2]/30"
          }`}
        >
          {t("beforeAfter.before")}
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`flex-1 py-2.5 text-[10px] tracking-[0.2em] uppercase font-body transition-colors ${
            showAfter
              ? "bg-[#C4A96B] text-white"
              : "border border-[#C4A96B]/30 text-[#C4A96B]/60 hover:border-[#C4A96B] hover:text-[#C4A96B]"
          }`}
        >
          {t("beforeAfter.after")}
        </button>
      </div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  const { t } = useTranslation();
  return (
    <section id="transformations" className="py-24 md:py-32 bg-[#1A2535] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("beforeAfter.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            {t("beforeAfter.title")}
          </h2>
          <p className="mt-4 text-[#F7F5F2]/45 text-sm font-body max-w-xl leading-relaxed">
            {t("beforeAfter.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTIES.map((prop, i) => (
            <PropertyCard key={prop.id} prop={prop} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
