import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer({ visitorType = "proprietaire" }) {
  const { t } = useTranslation();
  const isVoyageur = visitorType === "voyageur";
  const footerBg  = isVoyageur ? "bg-[#F0F9FF]"            : "bg-[#F7F5F2]";
  const brandTint = isVoyageur ? "text-[#0C4A6E]/[0.06]"   : "text-[#2D2D2D]/[0.06]";
  const divider   = isVoyageur ? "border-[#BAE6FD]"         : "border-[#E5E0DA]";
  const brandName = isVoyageur ? "text-[#0C4A6E]"           : "text-[#2D2D2D]";
  const hoverLink = isVoyageur ? "hover:text-[#0891B2]"     : "hover:text-[#C4A96B]";
  const btnCls    = isVoyageur
    ? "bg-[#0891B2] text-white hover:bg-[#0369A1]"
    : "bg-[#1A2535] text-[#F7F5F2] hover:bg-[#C4A96B] hover:text-[#1A2535]";

  return (
    <footer className={`${footerBg} border-t ${isVoyageur ? "border-[#0C4A6E]/10" : "border-[#2D2D2D]/10"} pt-24 md:pt-32 pb-8`}>
      {/* Massive brand name */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`font-heading text-[6rem] md:text-[10rem] lg:text-[14rem] font-light ${brandTint} leading-none text-center tracking-[0.1em] select-none whitespace-nowrap`}
        >
          LOCAZEN 7
        </motion.h2>
      </div>

      {/* Footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b ${divider}`}>
          {/* Brand */}
          <div>
            <p className={`font-heading text-xl tracking-[0.15em] ${brandName} mb-3`}>
              LOCAZEN 7
            </p>
            <p className="text-[#2D2D2D]/50 text-sm font-body">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              {t("footer.navigation")}
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
                  className={`text-[#2D2D2D]/60 text-sm ${hoverLink} transition-colors font-body`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              {t("footer.contactLabel")}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:0659769194"
                className={`flex items-center gap-3 text-[#2D2D2D]/60 text-sm ${hoverLink} transition-colors font-body`}
              >
                <Phone size={14} />
                06.59.76.91.94
              </a>
              <a
                href="mailto:myriamboum34@gmail.com"
                className={`flex items-center gap-3 text-[#2D2D2D]/60 text-sm ${hoverLink} transition-colors font-body`}
              >
                <Mail size={14} />
                myriamboum34@gmail.com
              </a>
              <div className="flex items-center gap-3 text-[#2D2D2D]/60 text-sm font-body">
                <MapPin size={14} />
                34, rue Lucien Salette, 34200 Sète
              </div>
            </div>
          </div>

          {/* Hours / CTA */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/40 mb-4 font-body">
              {t("footer.ctaLabel")}
            </p>
            <p className="text-[#2D2D2D]/60 text-sm font-body mb-6">
              {t("footer.ctaText")}
            </p>
            <a
              href="tel:0659769194"
              className={`inline-flex items-center justify-center px-6 py-3 ${btnCls} text-xs tracking-[0.2em] uppercase font-body transition-colors duration-300 min-h-[44px]`}
            >
              {t("footer.callUs")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#2D2D2D]/30 text-xs font-body">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className={`text-[#2D2D2D]/30 text-xs ${hoverLink} transition-colors font-body`}>
              {t("footer.legal")}
            </Link>
            <Link to="/politique-confidentialite" className={`text-[#2D2D2D]/30 text-xs ${hoverLink} transition-colors font-body`}>
              {t("footer.privacy")}
            </Link>
          </div>
        </div>

        {/* Dev credit */}
        <div className="mt-6 text-center">
          <a
            href="https://soz-dev.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#2D2D2D]/20 text-[10px] tracking-[0.15em] uppercase font-body ${hoverLink} transition-colors`}
          >
            Faites-vous votre site sans attendre →
          </a>
        </div>
      </div>
    </footer>
  );
}
