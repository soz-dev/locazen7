import React from "react";
import { motion } from "framer-motion";
import { Check, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";

// V — Vacation theme: cyan ocean, amber sun, sky backgrounds
const V = {
  bg:       "bg-white border-t border-[#0C4A6E]/10",
  cardBg:   "bg-[#F0F9FF] border border-[#BAE6FD]",
  hlBg:     "bg-[#0C4A6E] md:-translate-y-4",
  accent:   "text-[#0891B2]",
  title:    "text-[#0C4A6E]",
  muted:    "text-[#0C4A6E]/50",
  check:    "text-[#0891B2]",
  badge:    "bg-[#F59E0B] text-white",
  btn:      "border border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white",
  btnHl:    "bg-[#F59E0B] text-white hover:bg-[#D97706]",
  border:   "border-[#BAE6FD]",
  footer:   "text-[#0C4A6E]/40",
};

const services = [
  {
    name: "Accueil",
    tagline: "Arrivée & départ",
    price: "55",
    unit: "€",
    features: [
      "Check-in en personne à l'arrivée",
      "État des lieux à l'entrée",
      "Remise des clés et présentation du logement",
      "Check-out et contrôle à la sortie",
      "Conciergerie disponible durant tout le séjour",
    ],
    highlight: false,
  },
  {
    name: "Ménage",
    tagline: "Entre chaque location",
    price: "Sur forfait",
    unit: "",
    features: [
      "Nettoyage complet du logement",
      "Forfait déterminé selon la superficie",
      "Et la composition de votre bien",
      "Réalisé entre chaque location",
      "À la charge du voyageur",
    ],
    highlight: true,
  },
  {
    name: "Blanchisserie",
    tagline: "Linge frais à chaque séjour",
    price: "dès 5",
    unit: "€",
    features: [
      "Grand lit : 20 €",
      "Petit lit : 15 €",
      "Kit serviettes : 5 € / personne",
      "Grande + petite serviette incluses",
      "À la charge du voyageur",
    ],
    highlight: false,
  },
];

export default function TravelerTarifs() {
  const { t } = useTranslation();
  const services = t("tarifs_v.services", { returnObjects: true });
  return (
    <section id="tarifs" className={`pt-10 pb-20 md:pt-12 md:pb-28 ${V.bg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves size={13} className={V.accent} />
            <p className={`text-xs tracking-[0.3em] uppercase font-body ${V.accent}`}>{t("tarifs_v.eyebrow")}</p>
          </div>
          <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light ${V.title}`}>
            {t("tarifs_v.title1")}<br /><span className="italic text-[#F59E0B]">{t("tarifs_v.title2")}</span>
          </h2>
          <p className={`mt-6 font-body text-sm max-w-md mx-auto ${V.muted}`}>
            {t("tarifs_v.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative p-8 flex flex-col ${p.highlight ? V.hlBg + " text-white" : V.cardBg + " " + V.title}`}
            >
              {p.highlight && (
                <span className={`absolute top-6 right-6 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-body ${V.badge}`}>
                  {t("tarifs_v.included")}
                </span>
              )}
              <h3 className={`font-heading text-3xl font-light mb-1 ${p.highlight ? "text-white" : V.title}`}>
                {p.name}
              </h3>
              <p className={`text-sm font-body mb-6 ${p.highlight ? "text-white/50" : V.muted}`}>
                {p.tagline}
              </p>
              {p.price && (
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`font-heading text-4xl font-light ${p.highlight ? "text-white" : V.title}`}>
                    {p.price}
                  </span>
                  {p.unit && (
                    <span className={`text-lg font-heading font-light ${p.highlight ? "text-white/70" : V.muted}`}>
                      {p.unit}
                    </span>
                  )}
                </div>
              )}
              <ul className="space-y-3 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-body">
                    <Check size={15} className={`flex-shrink-0 mt-0.5 ${V.check}`} />
                    <span className={p.highlight ? "text-white/80" : V.muted.replace("/50", "/80")}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`mt-8 px-6 py-4 text-xs tracking-[0.2em] uppercase font-body text-center transition-colors duration-300 min-h-[44px] flex items-center justify-center ${
                  p.highlight
                    ? "bg-[#F59E0B] text-white hover:bg-[#D97706]"
                    : "border border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
                }`}
              >
                {t("tarifs_v.contactBtn")}
              </a>
            </motion.div>
          ))}
        </div>
        <p className={`text-center text-xs font-body mt-10 ${V.footer}`}>
          {t("tarifs_v.packNote")}
        </p>
      </div>
    </section>
  );
}
