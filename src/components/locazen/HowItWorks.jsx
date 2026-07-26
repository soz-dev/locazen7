import React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, CalendarCheck, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";

const STEPS = [
  {
    n: "01",
    Icon: Search,
    title: "Évaluation gratuite",
    desc: "Nous visitons votre bien et estimons son potentiel locatif, sans engagement de votre part.",
  },
  {
    n: "02",
    Icon: Sparkles,
    title: "Prise en charge complète",
    desc: "Ménage professionnel, linge fourni, photos soignées, annonce optimisée et accueil des voyageurs.",
  },
  {
    n: "03",
    Icon: CalendarCheck,
    title: "Gestion des réservations",
    desc: "Vos annonces sur Airbnb, Booking et Abritel sont gérées pour maximiser le taux d'occupation.",
  },
  {
    n: "04",
    Icon: Banknote,
    title: "Vos revenus, sans effort",
    desc: "Versement mensuel transparent, bilan régulier. Vous profitez, sans vous occuper de rien.",
  },
];

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true });
  return (
    <section id="comment" className="pt-0 pb-24 md:pb-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">{t("howItWorks.eyebrow")}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#1A2535] leading-tight">
            {t("howItWorks.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <span className="font-heading text-6xl font-light text-[#C4A96B]/15 leading-none block mb-4">
                {s.n}
              </span>
              <div className="w-10 h-10 flex items-center justify-center bg-[#1A2535] mb-5">
                <s.Icon size={18} className="text-[#C4A96B]" />
              </div>
              <h3 className="font-heading text-xl font-light text-[#1A2535] mb-3">{steps[i]?.title ?? s.title}</h3>
              <p className="text-[#1A2535]/55 text-sm font-body leading-relaxed">{steps[i]?.desc ?? s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+12px)] w-full h-px bg-[#C4A96B]/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
