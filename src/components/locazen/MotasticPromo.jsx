import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ScanLine, Sparkles } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/fr/app/motastic/id6760564637";

export default function MotasticPromo({ audience }) {
  const isOwner = audience === "proprietaire";
  const accent = isOwner ? "#C4A96B" : "#F59E0B";
  const background = isOwner ? "bg-[#4F6254]" : "bg-[#0C4A6E]";

  return (
    <section className={`${background} px-6 py-16 md:py-20`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto grid max-w-5xl overflow-hidden border border-white/20 md:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="flex min-h-56 flex-col justify-between bg-[#101820] p-8 text-[#F7F5F2] md:p-10">
          <div className="flex items-start gap-5">
            <img
              src="/motastic-app-icon.png"
              alt="Icône de l'application Motastic"
              className="h-20 w-20 shrink-0 rounded-[18px] shadow-lg"
            />
            <div>
              <p className="font-body text-xs uppercase tracking-[0.22em] text-[#F59E0B]">Le jeu de mots</p>
              <h2 className="mt-2 font-heading text-5xl font-light leading-none">Motastic</h2>
            </div>
          </div>
          <p className="mt-8 max-w-xs font-body text-sm leading-relaxed text-[#F7F5F2]/70">
            Des lettres, un objectif, et toujours une nouvelle solution à trouver. Saurez-vous garder la flamme allumée ?
          </p>
          <div className="mt-7 flex items-center gap-4">
            <div className="shrink-0 bg-white p-2">
              <img
                src="/motastic-qr-code.svg"
                alt="QR code vers l'application Motastic sur l'App Store"
                className="h-20 w-20"
              />
            </div>
            <div className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-[#F7F5F2]/70">
              <ScanLine size={17} style={{ color: accent }} aria-hidden="true" />
              <span>Scannez pour jouer</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 text-[#F7F5F2] md:p-10">
          <div className="mb-4 flex items-center gap-2" style={{ color: accent }}>
            <Sparkles size={17} aria-hidden="true" />
            <p className="font-body text-xs uppercase tracking-[0.22em]">Une pause qui fait travailler les mots</p>
          </div>
          <p className="max-w-xl font-heading text-3xl font-light leading-tight md:text-4xl">
            {isOwner
              ? "Entre deux réservations, offrez-vous quelques minutes de jeu."
              : "Prolongez le plaisir du séjour avec une partie de mots."}
          </p>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-[#F7F5F2]/75">
            Un défi de mots à emporter partout : formez les bonnes réponses, enchaînez les parties et faites grimper votre score. Retrouvez Motastic sur l'App Store et laissez une note si le jeu vous plaît.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 px-6 py-3.5 font-body text-xs uppercase tracking-[0.16em] text-[#1A2535] transition-colors hover:bg-[#F7F5F2]"
            style={{ backgroundColor: accent }}
          >
            Découvrir Motastic sur l'App Store
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}