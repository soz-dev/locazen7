import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Escapade",
    nights: "2 nuits",
    price: "75",
    perNight: "puisque 85€/nuit",
    features: ["Studio ou T1", "Linge de lit & serviettes", "Check-in en personne", "Wi-Fi & clés fournies"],
    highlight: false,
  },
  {
    name: "Séjour",
    nights: "3–6 nuits",
    price: "95",
    perNight: "/ nuit",
    features: ["Appartement T2 ou T3", "Accueil personnalisé à l'arrivée", "Kit d'accueil (café, thé)", "Guides touristiques de Sète", "Assistance durant le séjour"],
    highlight: true,
  },
  {
    name: "Immersion",
    nights: "7 nuits et +",
    price: "110",
    perNight: "/ nuit",
    features: ["Maison ou appartement bord de plage", "Conciergerie dédiée 7j/7", "Ménage de mi-séjour offerte", "Expériences locales sur-mesure"],
    highlight: false,
  },
];

export default function TravelerTarifs() {
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-[#E5E0DA]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Tarifs voyageurs
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D]">
            Des séjours,<br /><span className="italic">à votre mesure</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative p-8 flex flex-col ${
                p.highlight
                  ? "bg-[#2D2D2D] text-[#F7F5F2] md:-translate-y-4"
                  : "bg-[#F7F5F2] text-[#2D2D2D] border border-[#E5E0DA]"
              }`}
            >
              {p.highlight && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-[#8E9B90] text-[#F7F5F2] text-[10px] tracking-[0.2em] uppercase font-body">
                  Populaire
                </span>
              )}
              <h3 className={`font-heading text-3xl font-light mb-1 ${p.highlight ? "text-[#F7F5F2]" : "text-[#2D2D2D]"}`}>
                {p.name}
              </h3>
              <p className={`text-sm font-body mb-6 ${p.highlight ? "text-[#F7F5F2]/50" : "text-[#2D2D2D]/50"}`}>
                {p.nights}
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className={`font-heading text-5xl font-light ${p.highlight ? "text-[#F7F5F2]" : "text-[#2D2D2D]"}`}>
                  {p.price}€
                </span>
                <span className={`text-sm font-body ${p.highlight ? "text-[#F7F5F2]/50" : "text-[#2D2D2D]/50"}`}>
                  {p.perNight}
                </span>
              </div>
              <ul className="space-y-3 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-body">
                    <Check size={15} className="flex-shrink-0 mt-0.5 text-[#8E9B90]" />
                    <span className={p.highlight ? "text-[#F7F5F2]/80" : "text-[#2D2D2D]/70"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 px-6 py-4 text-xs tracking-[0.2em] uppercase font-body text-center transition-colors duration-300 min-h-[44px] flex items-center justify-center ${
                  p.highlight
                    ? "bg-[#8E9B90] text-[#F7F5F2] hover:bg-[#7a8a7c]"
                    : "border border-[#2D2D2D]/30 text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#F7F5F2]"
                }`}
              >
                Réserver
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[#2D2D2D]/40 text-xs font-body mt-10">
          Tarifs indicatifs, susceptibles d'évoluer selon la saison. Contactez-nous pour un devis personnalisé.
        </p>
      </div>
    </section>
  );
}
