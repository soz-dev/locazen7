import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#F7F5F2] pt-24 md:pt-32 pb-8">
      {/* Massive brand name */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-heading text-[6rem] md:text-[10rem] lg:text-[14rem] font-light text-[#2D2D2D]/[0.06] leading-none text-center tracking-[0.1em] select-none whitespace-nowrap"
        >
          LOCAZEN
        </motion.h2>
      </div>

      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b border-[#E5E0DA]">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl tracking-[0.15em] text-[#2D2D2D] mb-3">
              LOCAZEN
            </p>
            <p className="text-[#2D2D2D]/50 text-sm font-body">
              Service de Conciergerie à Sète.<br />
              L'art de l'accueil, en personne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Accueil", href: "#accueil" },
                { label: "Services", href: "#services" },
                { label: "À propos", href: "#apropos" },
                { label: "Prestations", href: "#prestations" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[#2D2D2D]/60 text-sm hover:text-[#8E9B90] transition-colors font-body"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:0659769194"
                className="flex items-center gap-3 text-[#2D2D2D]/60 text-sm hover:text-[#8E9B90] transition-colors font-body"
              >
                <Phone size={14} />
                06.59.76.91.94
              </a>
              <div className="flex items-center gap-3 text-[#2D2D2D]/60 text-sm font-body">
                <MapPin size={14} />
                Centre-ville, Sète
              </div>
            </div>
          </div>

          {/* Hours / CTA */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              Nous contacter
            </p>
            <p className="text-[#2D2D2D]/60 text-sm font-body mb-6">
              Un projet de location saisonnière ? Nous serions ravis d'en discuter avec vous.
            </p>
            <a
              href="tel:0659769194"
              className="inline-block px-6 py-3 bg-[#8E9B90] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#7a8a7c] transition-colors duration-300 min-h-[44px] flex items-center justify-center"
            >
              Appelez-nous
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#2D2D2D]/30 text-xs font-body">
            © {new Date().getFullYear()} LocaZen — Conciergerie Sète. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#accueil" className="text-[#2D2D2D]/30 text-xs hover:text-[#8E9B90] transition-colors font-body">
              Mentions légales
            </a>
            <a href="#accueil" className="text-[#2D2D2D]/30 text-xs hover:text-[#8E9B90] transition-colors font-body">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
