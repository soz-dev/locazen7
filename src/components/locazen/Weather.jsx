import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";

const SETE_LAT = 43.4045;
const SETE_LON = 3.6978;

function wmoEmoji(code) {
  if (code === 0)  return "☀️";
  if (code <= 2)   return "🌤️";
  if (code === 3)  return "☁️";
  if (code <= 48)  return "🌫️";
  if (code <= 55)  return "🌦️";
  if (code <= 65)  return "🌧️";
  if (code <= 75)  return "❄️";
  if (code <= 82)  return "🌦️";
  if (code <= 86)  return "❄️";
  return "⛈️";
}

function wmoKey(code) {
  if (code === 0)  return "wmo_0";
  if (code <= 2)   return "wmo_1";
  if (code === 3)  return "wmo_3";
  if (code <= 48)  return "wmo_48";
  if (code <= 55)  return "wmo_55";
  if (code <= 65)  return "wmo_65";
  if (code <= 75)  return "wmo_75";
  if (code <= 82)  return "wmo_82";
  if (code <= 86)  return "wmo_86";
  return "wmo_99";
}

export default function Weather() {
  const { t } = useTranslation();
  const JOURS = t("weather.days", { returnObjects: true });
  const MOIS  = t("weather.months", { returnObjects: true });
  const labelDate = (dateStr, i) => {
    if (i === 0) return t("weather.today");
    if (i === 1) return t("weather.tomorrow");
    const d = new Date(dateStr + "T12:00:00");
    return `${Array.isArray(JOURS) ? JOURS[d.getDay()] : ""} ${d.getDate()} ${Array.isArray(MOIS) ? MOIS[d.getMonth()] : ""}`;
  };
  const [days, setDays]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${SETE_LAT}&longitude=${SETE_LON}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode` +
      `&timezone=Europe%2FParis&forecast_days=15`
    )
      .then((r) => r.json())
      .then(({ daily: d }) => {
        setDays(
          d.time.map((date, i) => ({
            date,
            tMax: Math.round(d.temperature_2m_max[i]),
            tMin: Math.round(d.temperature_2m_min[i]),
            rain: d.precipitation_probability_max[i] ?? 0,
            code: d.weathercode[i],
          }))
        );
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
      <section id="meteo" className="py-16 md:py-20 bg-white border-t border-[#0C4A6E]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body mb-4 flex items-center gap-2">
            <MapPin size={12} />
            {t("weather.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#0C4A6E] leading-tight">
            {t("weather.title")}
          </h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <p className="font-body text-sm text-[#0891B2]/50 tracking-[0.2em] uppercase animate-pulse">
              {t("weather.loading")}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="font-body text-sm text-[#0C4A6E]/40 tracking-wide">
              {t("weather.error")}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
              {days.map((day, i) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
                  className={`flex flex-col items-center text-center px-2 py-5 transition-colors duration-300
                    ${i === 0
                      ? "bg-[#0C4A6E] shadow-md"
                      : "bg-white/70 border border-[#E0F2FE] hover:bg-white"
                    }`}
                >
                  {/* Label jour */}
                  <p className={`text-[9px] md:text-[10px] font-body tracking-[0.12em] uppercase mb-3 leading-tight min-h-[2.5em] flex items-center
                    ${i === 0 ? "text-[#38BDF8]" : "text-[#0891B2]"}`}>
                    {labelDate(day.date, i)}
                  </p>

                  {/* Emoji météo */}
                  <span
                    className="text-3xl md:text-4xl leading-none mb-2"
                    role="img"
                    aria-label={t(`weather.${wmoKey(day.code)}`)}
                  >
                    {wmoEmoji(day.code)}
                  </span>

                  {/* Description */}
                  <p className={`text-[9px] font-body tracking-wide mb-4 leading-tight
                    ${i === 0 ? "text-[#F7F5F2]/60" : "text-[#0C4A6E]/50"}`}>
                    {t(`weather.${wmoKey(day.code)}`)}
                  </p>

                  {/* Températures */}
                  <div className={`text-sm font-body tabular-nums mb-2 ${i === 0 ? "text-[#F7F5F2]" : "text-[#0C4A6E]"}`}>
                    <span className="font-medium">{day.tMax}°</span>
                    <span className={`font-light ml-1 text-xs ${i === 0 ? "text-[#F7F5F2]/45" : "text-[#0C4A6E]/40"}`}>
                      {day.tMin}°
                    </span>
                  </div>

                  {/* Pluie */}
                  <div className={`flex items-center gap-0.5 text-[10px] font-body
                    ${i === 0 ? "text-[#38BDF8]/80" : day.rain >= 50 ? "text-[#0891B2]" : "text-[#0891B2]/40"}`}>
                    <Droplets size={10} />
                    {day.rain}%
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-5 text-right text-[#0C4A6E]/25 text-[9px] font-body tracking-[0.15em] uppercase">
              Source : Open-Meteo · Mis à jour quotidiennement
            </p>
          </>
        )}
      </div>
    </section>
  );
}
