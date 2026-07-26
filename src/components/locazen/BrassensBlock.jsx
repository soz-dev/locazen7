import React from "react";
import { motion } from "framer-motion";

export default function BrassensBlock() {
  return (
    <section className="bg-[#2D2D2D] py-16 md:py-20">
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
        className="mt-16 max-w-[400px] mx-auto px-6"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Brassens_TNP_1966_f11.jpg"
          alt="Georges Brassens en concert au Théâtre national populaire, 1966"
          className="w-full opacity-85 border border-white"
        />
        <p className="mt-4 text-center text-[#F7F5F2]/30 text-[10px] tracking-[0.25em] uppercase font-body">
          1921 — 1981 · Sète · TNP 1966
        </p>
      </motion.div>
    </section>
  );
}
