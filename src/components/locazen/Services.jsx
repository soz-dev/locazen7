import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "@/components/locazen/ServiceCard";

const KEYS_IMG = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/cfae5b405_generated_b4eaa100.png";
const ROOM_IMG = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/913eb32e6_generated_2307dbd5.png";
const STONES_IMG = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/206faebdc_generated_9ebe2353.png";

const services = [
  {
    title: "Suivi de vos réservations",
    description: "Gestion complète de vos plannings, tarification et confirmation de réservations sur Airbnb et Booking.",
    image: ROOM_IMG,
    alt: "Intérieur lumineux d'un appartement méditerranéen avec draps blancs et lumière naturelle",
  },
  {
    title: "Gestion des arrivées & départs",
    description: "Accueil en personne de vos voyageurs, état des lieux et accompagnement tout au long du séjour.",
    image: KEYS_IMG,
    alt: "Main élégante posant une clé en laiton sur du lin blanc avec une branche d'olivier",
  },
  {
    title: "Sérénité totale",
    description: "Ménage, blanchisserie, petit entretien et gestion du logement entre les locations. Votre bien est entre de bonnes mains.",
    image: STONES_IMG,
    alt: "Pierres de rivière en équilibre dans une lumière dorée matinale, atmosphère zen",
  },
];

export default function Services() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Nos engagements
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D] leading-tight">
            Chaque détail,<br />
            <span className="italic">pensé pour vous</span>
          </h2>
        </motion.div>

        {/* Scroll controls */}
        <div className="flex justify-end gap-3 mb-8">
          <button
            onClick={() => scroll(-1)}
            className="p-3 border border-[#E5E0DA] hover:border-[#8E9B90] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft size={18} className="text-[#2D2D2D]" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-3 border border-[#E5E0DA] hover:border-[#8E9B90] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight size={18} className="text-[#2D2D2D]" />
          </button>
        </div>

        {/* Horizontal scroll reel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((s, i) => (
            <div key={i} className="snap-start">
              <ServiceCard {...s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
