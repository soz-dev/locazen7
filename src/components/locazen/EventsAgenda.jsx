import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

// Événements annuels : mois (1-12), jour de début, jour de fin (optionnel).
// Sans jour de fin, seule le mois est affiché. La prochaine occurrence est recalculée automatiquement.
const EVENTS = [
  { i: 0, m: 8, d: 23, endD: 27, typeBg: "#0891B2" },
  { i: 1, m: 9, d: 7, typeBg: "#0C4A6E" },
  { i: 2, m: 10, d: 10, typeBg: "#F59E0B" },
  { i: 3, m: 12, d: 5, typeBg: "#EF4444" },
  { i: 4, m: 7, d: 10, typeBg: "#F59E0B" },
  { i: 5, m: 7, d: 1, typeBg: "#0C4A6E" },
];
const MAX_EVENTS = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

function nextOccurrence(ev, today) {
  const endDay = ev.endD ?? ev.d;
  for (let year = today.getFullYear(); ; year++) {
    const end = new Date(year, ev.m - 1, endDay);
    if (end >= today) return { year, start: new Date(year, ev.m - 1, ev.d) };
  }
}

function formatDates(ev, year, lang) {
  const month = new Date(year, ev.m - 1, 1).toLocaleDateString(lang, { month: "long" });
  if (!ev.endD) return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
  return `${ev.d} – ${ev.endD} ${month} ${year}`;
}

function countdown(dateStart, today, t) {
  const diff = Math.max(0, Math.ceil((dateStart - today) / DAY_MS));
  if (diff === 0) return t("agenda.today");
  if (diff === 1) return t("agenda.tomorrow");
  if (diff < 30) return t("agenda.in_days", { count: diff });
  return t("agenda.in_months", { count: Math.floor(diff / 30) });
}

export default function EventsAgenda() {
  const { t, i18n } = useTranslation();
  const texts = t("agenda.events", { returnObjects: true });
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const events = (Array.isArray(texts) ? EVENTS : [])
    .map((ev) => ({ ev, text: texts[ev.i], ...nextOccurrence(ev, today) }))
    .filter((x) => x.text)
    .sort((a, b) => a.start - b.start)
    .slice(0, MAX_EVENTS);
  return (
    <section id="agenda" className="py-16 md:py-20 bg-[#F0F9FF] border-t border-[#0C4A6E]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
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
          {events.map(({ ev, text: e, year, start }, i) => {
            const cd = countdown(start, today, t);
            const highlight = i === 0;
            const typeBg = ev.typeBg;
            return (
              <motion.div
                key={ev.i}
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
                  {formatDates(ev, year, i18n.language)}
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
