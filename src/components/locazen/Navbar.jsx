import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Repeat, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const travelerLinks = [];
const ownerLinks = [];

export default function Navbar({ visitorType, onSwitch }) {
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language?.startsWith("en") ? "en" : "fr");
  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    i18n.changeLanguage(next);
  };
  const links = visitorType === "voyageur" ? t("navbar.travelerLinks", { returnObjects: true }) : t("navbar.ownerLinks", { returnObjects: true });
  const modeLabel = visitorType === "voyageur" ? t("navbar.traveler") : t("navbar.owner");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    onSwitch();
  };

  const openAdminModal = () => {
    setAdminPwd("");
    setAdminErr(false);
    setShowPwd(false);
    setOpen(false);
    setAdminOpen(true);
  };

  const submitAdminPwd = (e) => {
    e.preventDefault();
    if (adminPwd.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem("locazen_admin", "true");
      setAdminOpen(false);
      navigate("/locazen-admin");
    } else {
      setAdminErr(true);
      setAdminPwd("");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(prev => {
        if (!prev && y > 80) return true;
        if (prev && y < 20) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isVoyageur  = visitorType === "voyageur";
  const scrolledBg  = isVoyageur ? "bg-[#0C4A6E]/95" : "bg-[#1A2535]/95";
  const logoColor   = "text-[#F7F5F2]";
  const badgeStyle  = scrolled
    ? (isVoyageur ? "bg-[#0891B2]/30 text-[#38BDF8]" : "bg-[#C4A96B]/20 text-[#C4A96B]")
    : "bg-[#F7F5F2]/20 text-[#F7F5F2]/90";
  const linkColor   = "text-[#F7F5F2]/80 hover:text-[#F7F5F2]";
  const mutedColor  = "text-[#F7F5F2]/60 hover:text-[#F7F5F2]";
  const adminColor  = "text-[#F7F5F2]/30 hover:text-[#F7F5F2]/60";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? `${scrolledBg} backdrop-blur-md shadow-sm py-3`
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto pl-[10px] pr-4 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <button onClick={handleLogoClick} className={`font-heading text-2xl tracking-[0.2em] font-light leading-none min-h-[auto] transition-colors duration-500 ${logoColor}`}>
              LOCAZEN 7
            </button>
            <span className={`mt-1.5 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-body transition-all duration-500 ${badgeStyle}`}>
              {modeLabel}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs font-body tracking-[0.1em] uppercase transition-colors duration-300 ${linkColor}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={onSwitch}
              className={`hidden md:flex items-center gap-1.5 transition-colors min-h-[44px] px-2 ${mutedColor}`}
              aria-label="Changer de profil"
            >
              <Repeat size={13} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-body">{t("navbar.switch")}</span>
            </button>
            <button
              onClick={toggleLang}
              className={`hidden md:flex items-center transition-colors min-h-[44px] px-2 text-[10px] tracking-[0.15em] uppercase font-body ${mutedColor}`}
              aria-label="Changer de langue"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              onClick={openAdminModal}
              className={`hidden md:flex items-center gap-1 transition-colors min-h-[44px] px-1 ml-3 border-l border-current/20 pl-4 ${adminColor}`}
              aria-label="Accès administration"
            >
              <Lock size={12} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-body">Admin</span>
            </button>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Ouvrir le menu"
            >
              <Menu size={24} className="text-[#F7F5F2]" />
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
                  className={`font-heading text-3xl font-light tracking-[0.15em] text-[#2D2D2D] ${isVoyageur ? "hover:text-[#0891B2]" : "hover:text-[#C4A96B]"} transition-colors`}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setOpen(false); onSwitch(); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mt-4 flex items-center gap-2 ${isVoyageur ? "text-[#0891B2]" : "text-[#C4A96B]"}`}
              >
                <Repeat size={16} />
                <span className="text-sm tracking-[0.15em] uppercase font-body">Changer de profil</span>
              </motion.button>
              <motion.button
                onClick={openAdminModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-2 flex items-center gap-2 text-[#2D2D2D]/30 hover:text-[#2D2D2D]/60 transition-colors"
              >
                <Lock size={14} />
                <span className="text-xs tracking-[0.15em] uppercase font-body">Admin</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal mot de passe admin */}
      <AnimatePresence>
        {adminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2D2D2D]/50 backdrop-blur-sm px-6"
            onClick={(e) => { if (e.target === e.currentTarget) setAdminOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F7F5F2] w-full max-w-sm p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setAdminOpen(false)}
                className="absolute top-4 right-4 p-1 text-[#2D2D2D]/40 hover:text-[#2D2D2D] transition-colors"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 flex items-center justify-center bg-[#2D2D2D]">
                  <Lock size={15} className="text-[#F7F5F2]" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-light tracking-[0.1em] text-[#2D2D2D]">Administration</h2>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8E9B90] font-body">Accès restreint</p>
                </div>
              </div>

              <form onSubmit={submitAdminPwd} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={adminPwd}
                    onChange={(e) => { setAdminPwd(e.target.value); setAdminErr(false); }}
                    placeholder="Mot de passe"
                    autoFocus
                    className={`w-full bg-white border px-4 py-3 text-sm font-body text-[#2D2D2D] outline-none pr-10 transition-colors ${
                      adminErr ? "border-red-400" : "border-[#2D2D2D]/20 focus:border-[#2D2D2D]/60"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D2D2D]/40 hover:text-[#2D2D2D]/70"
                    tabIndex={-1}
                  >
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {adminErr && (
                  <p className="text-red-500 text-xs font-body tracking-wide">Mot de passe incorrect.</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#2D2D2D] text-[#F7F5F2] py-3 text-xs tracking-[0.2em] uppercase font-body hover:bg-[#2D2D2D]/80 transition-colors"
                >
                  Accéder
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
