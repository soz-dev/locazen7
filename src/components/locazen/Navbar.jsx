import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Phone, Repeat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const travelerLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Locations", href: "#locations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Sète", href: "#sete" },
  { label: "Contact", href: "#contact" },
];

const ownerLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#apropos" },
  { label: "Prestations", href: "#prestations" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ visitorType, onSwitch }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const links = visitorType === "voyageur" ? travelerLinks : ownerLinks;
  const modeLabel = visitorType === "voyageur" ? "Voyageur" : "Propriétaire";

  const handleLogoClick = (e) => {
    e.preventDefault();
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      navigate("/locazen-admin");
      return;
    }
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
      const el = document.getElementById("accueil");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#F7F5F2]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleLogoClick} className="font-heading text-2xl tracking-[0.2em] font-light text-[#2D2D2D] min-h-[44px]">
              LOCAZEN
            </button>
            <span className="hidden md:inline px-3 py-1 bg-[#8E9B90]/10 text-[#8E9B90] text-[10px] tracking-[0.2em] uppercase font-body">
              {modeLabel}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-body tracking-[0.1em] uppercase text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSwitch}
              className="hidden md:flex items-center gap-2 text-[#8E9B90] hover:text-[#2D2D2D] transition-colors min-h-[44px] px-2"
              aria-label="Changer de profil"
            >
              <Repeat size={14} />
              <span className="text-xs tracking-[0.15em] uppercase font-body">Changer</span>
            </button>
            <a
              href="tel:0659769194"
              className="hidden md:flex items-center gap-2 text-sm tracking-wide text-[#8E9B90] hover:text-[#2D2D2D] transition-colors"
            >
              <Phone size={14} />
              06.59.76.91.94
            </a>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} className="text-[#2D2D2D]" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F7F5F2] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Fermer le menu"
            >
              <X size={28} className="text-[#2D2D2D]" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="font-heading text-3xl font-light tracking-[0.15em] text-[#2D2D2D] hover:text-[#8E9B90] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setOpen(false); onSwitch(); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center gap-2 text-[#8E9B90]"
              >
                <Repeat size={16} />
                <span className="text-sm tracking-[0.15em] uppercase font-body">Changer de profil</span>
              </motion.button>
              <motion.a
                href="tel:0659769194"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 flex items-center gap-2 text-[#2D2D2D]/70"
              >
                <Phone size={16} />
                06.59.76.91.94
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
