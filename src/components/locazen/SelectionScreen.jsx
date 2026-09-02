import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Plane, Home as HomeIcon } from "lucide-react";

const SETE_AERIAL = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/19bec1b47_generated_b8bfc10c.png";
const BED_IMMACULATE = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/c34b497c7_generated_image.png";

export default function SelectionScreen({ onSelect }) {
  const choices = [
    {
      type: "voyageur",
      icon: Plane,
      title: "Je suis voyageur",
      subtitle: "Je cherche une location pour mes vacances à Sète",
      image: SETE_AERIAL,
      alt: "Vue aérienne du port de Sète au coucher du soleil",
    },
    {
      type: "proprietaire",
      icon: HomeIcon,
      title: "Je suis propriétaire",
      subtitle: "Je cherche une conciergerie pour mon bien",
      image: BED_IMMACULATE,
      alt: "Chambre impeccable avec draps blancs et serviettes pliées",
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl md:text-7xl font-light text-[#2D2D2D] tracking-[0.05em]"
        >
          LOCAZEN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-[#2D2D2D]/60 text-base md:text-lg font-body max-w-md mx-auto"
        >
          Pour commencer, dites-nous qui vous êtes
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
                <div className="w-12 h-12 flex items-center justify-center bg-[#F7F5F2]/15 backdrop-blur-sm mb-5 transition-all duration-500 group-hover:bg-[#8E9B90]">
                  <c.icon size={20} className="text-[#F7F5F2]" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-[#F7F5F2] leading-tight mb-2">
                  {c.title}
                </h2>
                <p className="text-[#F7F5F2]/70 text-sm font-body mb-5">{c.subtitle}</p>
                <span className="inline-flex items-center gap-2 text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body">
                  Entrer
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
