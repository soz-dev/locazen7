import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PROPERTY_TYPES = [
  { key: "studio",  label: "Studio",          pricePerNight:  75, avgNights: 5   },
  { key: "t2",     label: "Appartement T2",  pricePerNight:  95, avgNights: 5   },
  { key: "t3",     label: "Appartement T3",  pricePerNight: 120, avgNights: 5   },
  { key: "t4",     label: "Appartement T4",  pricePerNight: 180, avgNights: 4.5 },
  { key: "t5",     label: "Appartement T5",  pricePerNight: 250, avgNights: 4.5 },
  { key: "maison", label: "Maison",           pricePerNight: 300, avgNights: 4.5 },
];

export default function RevenueSimulator() {
  const { t } = useTranslation();
  const [weeks, setWeeks] = useState(24);
  const [propKey, setPropKey] = useState("t2");

  const prop = PROPERTY_TYPES.find((p) => p.key === propKey);
  const annualGross = Math.round(weeks * prop.avgNights * prop.pricePerNight);
  const monthlyGross = Math.round(annualGross / 12);

  return (
    <section id="simulateur" className="py-16 md:py-20 bg-[#1A2535]">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("simulator.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#F7F5F2] leading-tight">
            {t("simulator.title")}
          </h2>
          <p className="mt-4 text-[#F7F5F2]/40 text-sm font-body">
            {t("simulator.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contrôles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Type de bien */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-body text-[#F7F5F2]/40 mb-4">
                {t("simulator.type")}
              </p>
              <div className="space-y-3">
                {PROPERTY_TYPES.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPropKey(p.key)}
                    className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-colors ${
                      propKey === p.key
                        ? "border-[#C4A96B] bg-[#C4A96B]/10"
                        : "border-[#F7F5F2]/10 hover:border-[#C4A96B]/40"
                    }`}
                  >
                    <span
                      className={`text-sm font-body ${
                        propKey === p.key ? "text-[#F7F5F2]" : "text-[#F7F5F2]/45"
                      }`}
                    >
                      {p.label}
                    </span>
                    <span
                      className={`font-heading text-base font-light ${
                        propKey === p.key ? "text-[#C4A96B]" : "text-[#F7F5F2]/25"
                      }`}
                    >
                      {p.pricePerNight}€
                      <span className="text-[10px] font-body font-normal">/nuit</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Semaines slider */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <p className="text-xs tracking-[0.2em] uppercase font-body text-[#F7F5F2]/40">
                {t("simulator.weeks_label")}
                </p>
                <span className="font-heading text-3xl font-light text-[#C4A96B]">
                  {weeks}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="48"
                step="1"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#C4A96B]"
              />
              <div className="flex justify-between mt-2 text-[10px] font-body text-[#F7F5F2]/25">
                <span>4 sem.</span>
                <span>48 sem.</span>
              </div>
            </div>
          </motion.div>

          {/* Résultats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {/* Image décorative */}
            <div className="overflow-hidden h-44 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
                alt="Simulation de revenus locatifs"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="border border-[#F7F5F2]/10 p-7">
              <p className="text-[#F7F5F2]/40 text-xs font-body tracking-[0.2em] uppercase mb-3">
                {t("simulator.monthly")}
              </p>
              <p className="font-heading text-4xl font-light text-[#F7F5F2]">
                {monthlyGross.toLocaleString("fr-FR")}€*
              </p>
            </div>

            <div className="bg-[#C4A96B] p-7">
              <p className="text-[#1A2535]/55 text-xs font-body tracking-[0.2em] uppercase mb-3">
                {t("simulator.annual")}
              </p>
              <p className="font-heading text-5xl font-light text-[#1A2535]">
                {annualGross.toLocaleString("fr-FR")}€*
              </p>
              <p className="text-[#1A2535]/45 text-xs font-body mt-3 leading-relaxed">
                {t("simulator.note")}
              </p>
              <p className="text-[#1A2535]/50 text-[10px] font-body mt-2 leading-relaxed">
                * Estimation indicative. Les revenus réels varient selon le bien, son emplacement et sa disponibilité.
              </p>
            </div>

            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-4 border border-[#F7F5F2]/25 text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#F7F5F2]/10 transition-colors min-h-[44px]"
            >
              {t("simulator.cta")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
