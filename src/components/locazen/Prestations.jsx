import React from "react";
import { motion } from "framer-motion";
import {
  FileText, CalendarCheck, Users, ClipboardCheck,
  Building, Sparkles, Shirt, Wrench, Map, HeartHandshake
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = [FileText, CalendarCheck, Users, ClipboardCheck, Building, Users, Sparkles, Shirt, Wrench, Map, HeartHandshake];

export default function Prestations() {
  const { t } = useTranslation();
  const items = t("prestations.items", { returnObjects: true });
  return (
    <section id="prestations" className="py-24 md:py-32 bg-[#F7F5F2] border-t border-[#2D2D2D]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#C4A96B] text-xs tracking-[0.3em] uppercase font-body mb-4">
            {t("prestations.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D]">
            {t("prestations.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {Array.isArray(items) && items.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group flex items-start gap-5 p-6 hover:bg-[#E5E0DA]/30 transition-colors duration-500 cursor-default"
            >
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#C4A96B]/10 group-hover:bg-[#C4A96B]/20 transition-colors duration-500">
                {React.createElement(ICONS[i] ?? HeartHandshake, { size: 20, className: "text-[#C4A96B]" })}
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
