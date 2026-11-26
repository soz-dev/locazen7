import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { fetchRentals } from "@/lib/rentalsApi";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_RENTALS = [
  { id: "p1", name: "Appartement Vue Port",      type: "T2 · Centre-ville",  price: 95,  guests: 2 },
  { id: "p2", name: "Studio Terrasse Ensoleillée", type: "Studio · Corniche", price: 75,  guests: 2 },
  { id: "p3", name: "Maison avec Piscine",         type: "Maison · Lazaret",  price: 175, guests: 6 },
];

const CLEANING_FEE = 50;

export default function StayCalculator() {
  const { t } = useTranslation();
  const [nights, setNights]       = useState(7);
  const [selectedId, setSelectedId] = useState(null);
  const [rentals, setRentals]     = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchRentals()
      .then((data) => setRentals(data.length > 0 ? data : PLACEHOLDER_RENTALS))
      .catch(() => setRentals(PLACEHOLDER_RENTALS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (rentals.length > 0 && selectedId === null) setSelectedId(rentals[0].id);
  }, [rentals]);

  const selected      = rentals.find((r) => r.id === selectedId) ?? rentals[0];
  const accommodation = selected ? nights * selected.price : 0;
  const total         = accommodation + CLEANING_FEE;

  const change = (delta) => setNights((n) => Math.max(1, Math.min(30, n + delta)));

  return (
    <section id="calculateur" className="pt-8 pb-24 md:pt-10 md:pb-32 bg-[#F0F9FF]">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body mb-4">{t("calculator.eyebrow")}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0C4A6E] leading-tight">
            {t("calculator.title")}
          </h2>
          <p className="mt-4 text-[#0C4A6E]/50 text-sm font-body">
            {t("calculator.subtitle")}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#0891B2]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <p className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-body text-[#0C4A6E]/55 mb-5">
                  <Moon size={12} />{t("calculator.duration")}
                </p>
                <div className="flex items-center gap-4">
                  <button onClick={() => change(-1)} className="w-10 h-10 border border-[#E0F2FE] text-[#0891B2] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors">
                    <ChevronDown size={18} />
                  </button>
                  <span className="font-heading text-5xl font-light text-[#0C4A6E] w-20 text-center tabular-nums">{nights}</span>
                  <button onClick={() => change(1)} className="w-10 h-10 border border-[#E0F2FE] text-[#0891B2] flex items-center justify-center hover:bg-[#E0F2FE] transition-colors">
                    <ChevronUp size={18} />
                  </button>
                  <span className="text-sm font-body text-[#0C4A6E]/40">{nights > 1 ? t("calculator.nights") : t("calculator.night")}</span>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-[#0C4A6E]/55 mb-4">{t("calculator.rental")}</p>
                <div className="space-y-3">
                  {rentals.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 border text-left transition-colors ${
                        selectedId === r.id ? "border-[#0891B2] bg-[#F0F9FF]" : "border-[#E0F2FE] hover:border-[#0891B2]/40"
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-body ${selectedId === r.id ? "text-[#0C4A6E]" : "text-[#0C4A6E]/60"}`}>{r.name}</p>
                        {r.type && (
                          <p className="text-[10px] text-[#0C4A6E]/35 font-body mt-0.5">
                            {r.type}{r.guests ? ` · ${r.guests} ${t("calculator.guests_max")}` : ""}
                          </p>
                        )}
                      </div>
                      <span className={`font-heading text-lg font-light ${selectedId === r.id ? "text-[#0891B2]" : "text-[#0C4A6E]/30"}`}>
                        {r.price}€<span className="text-[10px] font-body font-normal text-[#0C4A6E]/30">{t("calculator.per_night")}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              transition={{ duration: 0.7 }}
              className="bg-[#0C4A6E] p-10 flex flex-col gap-6"
            >
              <p className="text-[#38BDF8]/60 text-xs tracking-[0.3em] uppercase font-body">{t("calculator.summary")}</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#F7F5F2]/55 text-sm font-body">{selected?.price}€ × {nights} {nights > 1 ? t("calculator.nights") : t("calculator.night")}</span>
                  <span className="text-[#F7F5F2] font-heading text-xl font-light">{accommodation.toLocaleString("fr-FR")}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#F7F5F2]/55 text-sm font-body">{t("calculator.cleaning")}</span>
                  <span className="text-[#F7F5F2] font-heading text-xl font-light">{CLEANING_FEE}€</span>
                </div>
                <div className="border-t border-[#F7F5F2]/15 pt-5 flex justify-between items-end">
                  <span className="text-[#F7F5F2]/70 text-sm font-body">{t("calculator.total")}</span>
                  <span className="font-heading text-5xl font-light text-[#F59E0B]">{total.toLocaleString("fr-FR")}€</span>
                </div>
              </div>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-4 bg-[#0891B2] text-white text-xs tracking-[0.2em] uppercase font-body hover:bg-[#38BDF8] transition-colors min-h-[44px]"
              >
                {t("calculator.cta")}
              </button>
              <p className="text-[#F7F5F2]/25 text-[10px] font-body text-center leading-relaxed">
                {t("calculator.disclaimer")}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
