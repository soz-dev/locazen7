import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const TODAY = new Date("2026-07-23");

const EVENTS = [
  {
    id: 1,
    name: "Fêtes de la Saint-Louis",
    dates: "23 – 27 août 2026",
    dateStart: new Date("2026-08-23"),
    type: "Joutes nautiques",
    typeBg: "#0891B2",
    desc: "Le plus grand tournoi de joutes nautiques de France. Spectacles pyrotechniques, concerts et animations sur les canaux de Sète.",
    lieu: "Canaux de Sète",
    highlight: true,
  },
  {
    id: 2,
    name: "Fête de la Mer",
    dates: "Septembre 2026",
    dateStart: new Date("2026-09-07"),
    type: "Tradition",
    typeBg: "#0C4A6E",
    desc: "Bénédiction des bateaux de pêche, procession en mer et festivités animées tout le week-end.",
    lieu: "Port de Sète",
    highlight: false,
  },
  {
    id: 3,
    name: "Les Langues de Renard",
    dates: "Octobre 2026",
    dateStart: new Date("2026-10-10"),
    type: "Festival",
    typeBg: "#F59E0B",
    desc: "Festival de musique alternative et expérimentale au cœur de Sète, avec artistes locaux et internationaux.",
    lieu: "Sète",
    highlight: false,
  },
  {
    id: 4,
    name: "Marché de Noël",
    dates: "Décembre 2026",
    dateStart: new Date("2026-12-05"),
    type: "Marché",
    typeBg: "#EF4444",
    desc: "Marché artisanal traditionnel avec produits locaux, vins de la région et créateurs sétois.",
    lieu: "Centre-ville",
    highlight: false,
  },
];

function countdown(dateStart, t) {
  const diff = Math.ceil((dateStart - TODAY) / (1000 * 60 * 60 * 24));
  if (diff < 0) return null;
  if (diff === 0) return t("agenda.today");
  if (diff === 1) return t("agenda.tomorrow");
  if (diff < 30) return t("agenda.in_days", { count: diff });
  const months = Math.floor(diff / 30);
  return t("agenda.in_months", { count: months });
}

export default function EventsAgenda() {
  const { t } = useTranslation();
  const events = t("agenda.events", { returnObjects: true });
  return (
    <section id="agenda" className="py-16 md:py-20 bg-[#F0F9FF] border-t border-[#0C4A6E]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} className="text-[#0891B2]" />
            <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body">
              {t("agenda.eyebrow")}
            </p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0C4A6E] leading-tight">
            {t("agenda.title")}
          </h2>
          <p className="mt-4 text-[#0C4A6E]/50 text-sm font-body">
            {t("agenda.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(events) && events.map((e, i) => {
            const dateStart = new Date(EVENTS[i]?.dateStart ?? TODAY);
            const cd = countdown(dateStart, t);
            const highlight = EVENTS[i]?.highlight ?? false;
            const typeBg = EVENTS[i]?.typeBg ?? "#0891B2";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`bg-white p-7 border ${
                  highlight ? "border-[#0891B2]/30" : "border-[#E0F2FE]"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className="px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-body text-white"
                    style={{ backgroundColor: typeBg }}
                  >
                    {e.type}
                  </span>
                  {cd && (
                    <span
                      className={`text-xs font-body ${
                        highlight ? "text-[#0891B2] font-medium" : "text-[#0C4A6E]/35"
                      }`}
                    >
                      {cd}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-2xl font-light text-[#0C4A6E] mb-1">
                  {e.name}
                </h3>
                <p className="text-[#0891B2] text-xs font-body tracking-wide mb-3">
                  {e.dates}
                </p>
                <p className="text-[#0C4A6E]/55 text-sm font-body leading-relaxed mb-5">
                  {e.desc}
                </p>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#0891B2]" />
                  <span className="text-xs font-body text-[#0C4A6E]/40">{e.lieu}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
