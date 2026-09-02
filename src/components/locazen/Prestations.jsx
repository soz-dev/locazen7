import React from "react";
import { motion } from "framer-motion";
import {
  FileText, CalendarCheck, Users, ClipboardCheck,
  Building, Sparkles, Shirt, Wrench, Map, HeartHandshake
} from "lucide-react";

const prestations = [
  { icon: FileText, title: "Création d'annonces", desc: "Rédaction et photos sur Airbnb & Booking" },
  { icon: CalendarCheck, title: "Planification", desc: "Gestion des plannings et tarification" },
  { icon: Users, title: "Confirmation", desc: "Suivi et confirmation de vos réservations" },
  { icon: ClipboardCheck, title: "Déclaration nuitées", desc: "Sur la plateforme dédiée" },
  { icon: Building, title: "Gestion du logement", desc: "Durant la vacance de votre bien" },
  { icon: Users, title: "Arrivées & départs", desc: "Présence physique, état des lieux" },
  { icon: Sparkles, title: "Ménage", desc: "Entre les locations, à la charge du voyageur" },
  { icon: Shirt, title: "Blanchisserie", desc: "Linge frais pour chaque voyageur" },
  { icon: Wrench, title: "Petit entretien", desc: "Bricolage et appel dépannage" },
  { icon: Map, title: "Guides touristiques", desc: "Mise à disposition pour vos voyageurs" },
  { icon: HeartHandshake, title: "Accompagnement", desc: "Aide aux vacanciers durant leur séjour" },
];

export default function Prestations() {
  return (
    <section id="prestations" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Ce que nous faisons
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D]">
            Nos prestations
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {prestations.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group flex items-start gap-5 p-6 hover:bg-[#E5E0DA]/30 transition-colors duration-500 cursor-default"
            >
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#8E9B90]/10 group-hover:bg-[#8E9B90]/20 transition-colors duration-500">
                <p.icon size={20} className="text-[#8E9B90]" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-normal text-[#2D2D2D] mb-1">
                  {p.title}
                </h3>
                <p className="text-[#2D2D2D]/60 text-sm font-body">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
