import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import { ChevronDown } from "lucide-react";

export default function Hero({
  image,
  wordTop = "Loca",
  wordBottom = "Zen",
  eyebrow = "Conciergerie · Sète",
  tagline = "L'art de l'accueil, en personne",
  ctaLabel = "Découvrir nos services",
  ctaHref = "#services",
}) {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouse = (e) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 20);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section id="accueil" className="relative h-screen overflow-hidden bg-[#2D2D2D]">
      <motion.div
        style={{ y: imgY, x: mouseX, translateY: mouseY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src={image}
          alt="Vue immersive de Sète baignée de lumière dorée"
          className="w-full h-full object-cover"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D2D2D]/40 via-[#2D2D2D]/20 to-[#2D2D2D]/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-between px-6 md:px-16 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
        >
          <h1 className="font-heading font-light text-[#F7F5F2] text-5xl md:text-7xl lg:text-[6rem] tracking-[0.05em] leading-none">
            {wordTop}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="self-center text-center"
        >
          <p className="font-body text-[#F7F5F2]/80 text-sm md:text-base tracking-[0.3em] uppercase">
            {eyebrow}
          </p>
          <p className="mt-4 font-body text-[#F7F5F2]/60 text-sm md:text-lg max-w-lg tracking-wide font-light">
            {tagline}
          </p>
          <motion.a
            href={ctaHref}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block mt-8 px-10 py-4 bg-[#8E9B90] text-[#F7F5F2] text-sm tracking-[0.2em] uppercase font-body hover:bg-[#7a8a7c] transition-colors duration-500 min-h-[44px]"
          >
            {ctaLabel}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="self-end"
        >
          <h1 className="font-heading font-light text-[#F7F5F2] text-5xl md:text-7xl lg:text-[6rem] tracking-[0.05em] leading-none">
            {wordBottom}
          </h1>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={28} className="text-[#F7F5F2]/50" />
      </motion.div>
    </section>
  );
}
