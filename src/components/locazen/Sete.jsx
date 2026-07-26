import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Waves, Landmark, Utensils, Bike, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const SETE_PORT =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/S%C3%A8te_water_jousting_joute_nautique_%2852222049980%29.jpg/1920px-S%C3%A8te_water_jousting_joute_nautique_%2852222049980%29.jpg";

const ACTIVITIES = [
  {
    icon: Waves,
    category: "Plages & Nature",
    accent: "#38BDF8",
    items: [
      { name: "Plages de la Corniche", detail: "12 km de sable fin" },
      { name: "Étang de Thau", detail: "Flamants roses & huîtres" },
      { name: "Mont Saint-Clair", detail: "Panorama à 183 m" },
      { name: "Le Lido", detail: "Cordon littoral entre mer et étang" },
    ],
  },
  {
    icon: Landmark,
    category: "Culture & Patrimoine",
    accent: "#C4A96B",
    items: [
      { name: "Cimetière Marin", detail: "Brassens, Paul Valéry" },
      { name: "Musée Paul Valéry", detail: "Art méditerranéen" },
      { name: "MIAM", detail: "Arts Modestes contemporains" },
      { name: "Maison Brassens", detail: "Musée du chansonnier sétois" },
    ],
  },
  {
    icon: Utensils,
    category: "Gastronomie",
    accent: "#F59E0B",
    items: [
      { name: "Tielle sétoise", detail: "Tourte aux poulpes, spécialité locale" },
      { name: "Huîtres de Thau", detail: "Dégustation au bord de l'étang" },
      { name: "Macarons de Sète", detail: "Douceur moelleuse depuis 1809" },
      { name: "Terrasses sur les quais", detail: "Restaurants le long des canaux" },
    ],
  },
  {
    icon: Bike,
    category: "Sports & Activités",
    accent: "#34D399",
    items: [
      { name: "Joutes languedociennes", detail: "Sport traditionnel estival" },
      { name: "Voile & Nautisme", detail: "École de voile, location de bateaux" },
      { name: "Vélo sur le Lido", detail: "Piste cyclable face à la mer" },
      { name: "Kayak & Paddle", detail: "Canaux et lagune de Thau" },
    ],
  },
];

const NEARBY = [
  { city: "Montpellier", time: "30 min" },
  { city: "Cap d'Agde", time: "20 min" },
  { city: "Aigues-Mortes", time: "45 min" },
  { city: "Béziers", time: "30 min" },
  { city: "Nîmes", time: "1 h" },
  { city: "Carcassonne", time: "1 h 30" },
];

export default function Sete() {
  const { t } = useTranslation();
  const activities = t("sete.activities", { returnObjects: true });
  const ACTIVITY_ICONS = [Waves, Landmark, Utensils, Bike];
  const ACTIVITY_ACCENTS = ["#38BDF8", "#C4A96B", "#F59E0B", "#34D399"];
  const { scrollYProgress } = useScroll();
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      <section id="sete" className="relative overflow-hidden bg-[#2D2D2D] border-t border-white/10">

      {/* Image plein-écran — Port de Sète */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
          <img
            src={SETE_PORT}
            alt="Le port de Sète, cœur maritime de la ville sur l'Étang de Thau"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-[#8E9B90]" />
              <p className="text-[#F7F5F2]/60 text-xs tracking-[0.3em] uppercase font-body">
                {t("sete.eyebrow1")}
              </p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#F7F5F2] leading-tight">
              {t("sete.title1")}
            </h2>
          </motion.div>
        </div>
      </div>

      </section>

      {/* ── 2. Activités — fond clair ── */}
      <section className="bg-[#F0F9FF] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body mb-3">
                {t("sete.eyebrow2")}
              </p>
              <h3 className="font-heading text-3xl md:text-5xl font-light text-[#1A2535] leading-tight">
                {t("sete.title2")}
              </h3>
            </div>
            <p className="text-[#0C4A6E]/35 text-sm font-body max-w-xs leading-relaxed hidden md:block">
              {t("sete.subtitle") || "Découvrez la Venise du Languedoc à travers ses trésors."}
            </p>
          </motion.div>

          {/* Bandes éditoriales */}
          <div className="mb-14 divide-y divide-[#0C4A6E]/8">
            {Array.isArray(activities) && activities.map((cat, i) => {
              const Icon = ACTIVITY_ICONS[i] ?? Waves;
              const accent = ACTIVITY_ACCENTS[i] ?? "#38BDF8";
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 py-10 hover:bg-white/70 transition-colors duration-500 rounded-xl px-4 -mx-4"
                >
                  {/* Colonne gauche — numéro + catégorie */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-[3px] h-16 rounded-full mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <div>
                      <span
                        className="text-[10px] tracking-[0.35em] uppercase font-body block"
                        style={{ color: accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-heading text-2xl md:text-3xl font-light text-[#0C4A6E] leading-tight mt-1">
                        {cat.category}
                      </h4>
                    </div>
                  </div>

                  {/* Colonne droite — items */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 self-center">
                    {Array.isArray(cat.items) && cat.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]"
                          style={{ backgroundColor: accent }}
                        />
                        <div>
                          <p className="text-sm text-[#0C4A6E] font-body font-semibold leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#0C4A6E]/40 font-body mt-0.5 leading-snug">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* À proximité */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-[#BFDBFE] pt-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock size={14} className="text-[#0891B2]/50" />
              <p className="text-[#0891B2]/60 text-xs tracking-[0.25em] uppercase font-body">
                {t("sete.nearby")}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {NEARBY.map((n) => (
                <div
                  key={n.city}
                  className="flex items-center gap-2 bg-white border border-[#BFDBFE] rounded-full px-4 py-2"
                >
                  <span className="text-[#1A2535] text-sm font-body">{n.city}</span>
                  <span className="text-[#0891B2] text-xs font-body font-medium">{n.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Brassens — fond sombre ── */}
      <section className="bg-[#2D2D2D] py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <blockquote className="font-heading text-2xl md:text-3xl font-light text-[#F7F5F2]/80 italic leading-relaxed">
            « L'amitié n'exige rien en retour, que de l'entretien »
          </blockquote>
          <p className="mt-6 text-[#8E9B90] text-sm tracking-[0.2em] uppercase font-body">
            Georges Brassens
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 max-w-[260px] mx-auto px-6"
        >
          <img
            src="https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Brassens-StudioHarcourt-1957.png&width=600"
            alt="Portrait de Georges Brassens par Studio Harcourt, 1957"
            className="w-full opacity-80"
          />
          <p className="mt-4 text-center text-[#F7F5F2]/30 text-[10px] tracking-[0.25em] uppercase font-body">
            1921 — 1981 · Sète
          </p>
        </motion.div>
      </section>
    </>
  );
}
