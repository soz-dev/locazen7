import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Plane, Home as HomeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const SETE_AERIAL    = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
const BED_IMMACULATE = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80";

export default function SelectionScreen({ onSelect }) {
  const { t } = useTranslation();
  const choices = [
    {
      type: "voyageur",
      icon: Plane,
      title: t("selection.traveler.title"),
      subtitle: t("selection.traveler.subtitle"),
      cta: t("selection.traveler.cta"),
      image: SETE_AERIAL,
      alt: "Vue aérienne du port de Sète au coucher du soleil",
      hoverBg: "group-hover:bg-[#0891B2]",
    },
    {
      type: "proprietaire",
      icon: HomeIcon,
      title: t("selection.owner.title"),
      subtitle: t("selection.owner.subtitle"),
      cta: t("selection.owner.cta"),
      image: BED_IMMACULATE,
      alt: "Chambre impeccable avec draps blancs et serviettes pliées",
      hoverBg: "group-hover:bg-[#C4A96B]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Top brand */}
      <div className="pt-16 md:pt-24 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4"
        >
          Bienvenue
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <img src="/logo-locazen.png" alt="Locazen 7" className="h-24 md:h-32 w-auto" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-heading text-5xl md:text-7xl font-light text-[#2D2D2D] tracking-[0.2em]"
        >
          Locazen 7
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-[#2D2D2D]/60 text-base md:text-lg font-body max-w-md mx-auto"
        >
          {t("selection.prompt")}
        </motion.p>
      </div>

      {/* Choice cards */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl w-full">
          {choices.map((c, i) => (
            <motion.button
              key={c.type}
              onClick={() => onSelect(c.type)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.25, 0.1, 0, 1] }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden text-left min-h-[300px]"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image src={c.image} alt={c.alt} className="w-full h-full object-cover" fittingType="fill" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/85 via-[#2D2D2D]/30 to-transparent transition-all duration-500 group-hover:from-[#2D2D2D]/90" />

              <div className="relative h-full flex flex-col justify-end p-8">
                <div className={`w-12 h-12 flex items-center justify-center bg-[#F7F5F2]/15 backdrop-blur-sm mb-5 transition-all duration-500 ${c.hoverBg}`}>
                  <c.icon size={20} className="text-[#F7F5F2]" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-[#F7F5F2] leading-tight mb-2">
                  {c.title}
                </h2>
                <p className="text-[#F7F5F2]/70 text-sm font-body mb-5">{c.subtitle}</p>
                <span className="inline-flex items-center gap-2 text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body">
                  {c.cta}
                  <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
