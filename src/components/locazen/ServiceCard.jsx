import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

export default function ServiceCard({ title, description, image, alt, index, href = "#prestations" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0, 1] }}
      className="group relative flex-shrink-0 w-[280px] md:w-[340px] aspect-[2/3] overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          fittingType="fill"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/20 to-transparent transition-all duration-500 group-hover:from-[#2D2D2D]/90" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-heading text-2xl md:text-3xl font-light text-[#F7F5F2] tracking-wide leading-tight">
          {title}
        </h3>
        <p className="mt-3 text-[#F7F5F2]/70 text-sm font-body leading-relaxed max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:mt-3">
          {description}
        </p>
        <div className="mt-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <a
            href={href}
            onClick={(e) => { e.preventDefault(); const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center px-6 py-3 border border-[#F7F5F2]/40 text-[#F7F5F2] text-xs tracking-[0.2em] uppercase hover:bg-[#F7F5F2] hover:text-[#2D2D2D] transition-colors duration-300 min-h-[44px]"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </motion.div>
  );
}
