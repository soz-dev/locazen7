import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { MapPin } from "lucide-react";

const SETE_IMG = "https://media.base44.com/images/public/6a620b18b501d049df6dbc5c/6f1338bee_generated_95fe0ab6.png";

export default function Sete() {
  const { scrollYProgress } = useScroll();
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="sete" className="relative overflow-hidden">
      {/* Full-bleed image */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-105">
          <Image
            src={SETE_IMG}
            alt="Le port de Sète au coucher du soleil, reflets dorés sur les canaux méditerranéens"
            className="w-full h-full object-cover"
            fittingType="fill"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2D]/80 via-[#2D2D2D]/30 to-transparent" />

        {/* Content over image */}
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
                Ville de Sète
              </p>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#F7F5F2] leading-tight mb-6">
              À proximité<br />
              <span className="italic">de tout</span>
            </h2>
            <p className="text-[#F7F5F2]/70 font-body text-base max-w-lg leading-relaxed mb-4">
              Nous nous déplaçons en ville ou dans tout quartier de Sète, y compris ses bords de plage — Lazaret, Corniche, La Baleine, Villeroy...
            </p>
            <p className="text-[#F7F5F2]/50 font-body text-sm">
              Véhiculés, nous sommes situés en plein centre-ville.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
