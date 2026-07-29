import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("locazen_cookie_notice")) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("locazen_cookie_notice", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A2535] border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <p className="text-[#F7F5F2]/70 text-xs font-body leading-relaxed max-w-2xl">
        Ce site n'utilise pas de cookies de traçage ni de publicité. Seuls des cookies techniques strictement nécessaires au fonctionnement sont utilisés.{" "}
        <Link to="/politique-confidentialite" className="text-[#C4A96B] hover:underline">
          En savoir plus
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="flex items-center gap-2 shrink-0 px-5 py-2.5 bg-[#C4A96B] text-[#1A2535] text-xs tracking-[0.15em] uppercase font-body hover:bg-[#B8965A] transition-colors min-h-[40px]"
      >
        <X size={12} />
        Fermer
      </button>
    </div>
  );
}
