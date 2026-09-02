import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Loader2, ExternalLink, Waves, Sun, Coffee } from "lucide-react";
import { getAmenity } from "@/components/locazen/amenities";
import { fetchRentals, fetchSettings } from "@/lib/rentalsApi";
import { useTranslation } from "react-i18next";

const PLACEHOLDER_RENTALS = [
  {
    id: "p1",
    name: "Appartement Vue Port",
    type: "T2 · Centre-ville",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    price: 95,
    rating: "4.9",
    beds: 1, baths: 1, guests: 2,
    amenities: ["wifi", "ac", "terrace", "tv"],
    airbnb_url: null,
    badge: "Vue port",
  },
  {
    id: "p2",
    name: "Studio Terrasse Ensoleillée",
    type: "Studio · Corniche",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    price: 75,
    rating: "4.8",
    beds: null, baths: 1, guests: 2,
    amenities: ["wifi", "terrace", "kitchen", "ac"],
    airbnb_url: null,
    badge: "Plage à 5 min",
  },
  {
    id: "p3",
    name: "Maison avec Piscine",
    type: "Maison · Lazaret",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    price: 175,
    rating: "5.0",
    beds: 3, baths: 2, guests: 6,
    amenities: ["wifi", "pool", "parking", "washer", "ac"],
    airbnb_url: null,
    badge: "Coup de cœur",
  },
];

const cleanRentalName = (name) => name.replace(/\*+/g, "").replace(/\s{2,}/g, " ").trim();

export default function TravelerRentals() {
  const { t } = useTranslation();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchRentals(), fetchSettings()])
      .then(([list, settings]) => {
        let hidden = [];
        try { hidden = JSON.parse(settings.hidden_rentals || "[]"); } catch {}
        setRentals(list.filter(r => !hidden.includes(r.id)));
      })
      .catch(() => setRentals([]))
      .finally(() => setLoading(false));
  }, []);

  const displayRentals = rentals.length > 0 ? rentals : PLACEHOLDER_RENTALS;

  return (
    <section id="locations" className="py-16 md:py-20 bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE]/50 border-t border-[#0C4A6E]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Waves size={14} className="text-[#0891B2]" />
            <p className="text-[#0891B2] text-xs tracking-[0.3em] uppercase font-body">{t("rentals.eyebrow")}</p>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#0C4A6E] leading-tight">
            {t("rentals.title1")}<br />
            <span className="italic text-[#F59E0B]">{t("rentals.title2")}</span>
          </h2>
          {rentals.length === 0 && !loading && (
            <p className="mt-4 text-[#0C4A6E]/50 text-sm font-body">
              {t("rentals.placeholder")}
            </p>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#0891B2]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRentals.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    {r.image ? (
                      <img src={r.image} alt={cleanRentalName(r.name)} className="w-full h-full object-cover" style={{ objectPosition: `center ${r.imageY ?? 50}%` }} />
                    ) : (
                      <div className="w-full h-full bg-[#DBEAFE]" />
                    )}
                  </div>
                  {r.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#F59E0B] flex items-center gap-1.5">
                      <Sun size={11} className="text-white" />
                      <span className="text-xs font-body text-white tracking-wide">{r.badge}</span>
                    </div>
                  )}
                  {r.rating && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm flex items-center gap-1.5">
                      <Star size={11} className="text-[#F59E0B] fill-[#F59E0B]" />
                      <span className="text-xs font-body text-[#0C4A6E]">{r.rating}</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#0C4A6E]/85 backdrop-blur-sm">
                    <span className="text-white font-heading text-lg">{r.price}€</span>
                    <span className="text-white/60 text-xs font-body"> / nuit</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-light text-[#0C4A6E] mb-1">{cleanRentalName(r.name)}</h3>
                  {r.type && (
                    <p className="flex items-center gap-1.5 text-[#0C4A6E]/50 text-sm font-body mb-3">
                      <MapPin size={12} className="text-[#0891B2]" />
                      {r.type}
                    </p>
                  )}
                  {r.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {r.amenities.slice(0, 5).map((key) => {
                        const a = getAmenity(key);
                        if (!a) return null;
                        const Icon = a.Icon;
                        return (
                          <span key={key} className="flex items-center gap-1 px-2 py-1 bg-[#E0F2FE] text-[#0891B2] text-[10px] font-body tracking-wide">
                            <Icon size={10} />
                            {a.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-4 text-[#0C4A6E]/40 text-xs font-body border-t border-[#BAE6FD] pt-4">
                  {r.beds != null && <span>{r.beds} chambre{r.beds > 1 ? "s" : ""}</span>}
                  {r.baths != null && <span>{r.baths} sdb</span>}
                  {r.guests != null && <span>{r.guests} voyageurs</span>}
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-[#0891B2] text-[#0891B2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#0891B2] hover:text-white transition-colors duration-300 min-h-[44px]"
                  >
                    {t("rentals.contact")}
                  </button>
                  {r.airbnb_url && (
                    <a
                      href={r.airbnb_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0891B2] text-white text-xs tracking-[0.2em] uppercase font-body hover:bg-[#0C4A6E] transition-colors duration-300 min-h-[44px]"
                    >
                      {t("rentals.viewListing")} <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
