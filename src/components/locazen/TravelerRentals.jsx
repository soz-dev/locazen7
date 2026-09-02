import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Loader2, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { getAmenity } from "@/components/locazen/amenities";

export default function TravelerRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Rental.list()
      .then(setRentals)
      .catch(() => setRentals([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="locations" className="py-24 md:py-32 bg-[#F7F5F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#8E9B90] text-xs tracking-[0.3em] uppercase font-body mb-4">
            Nos locations
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D] leading-tight">
            Séjournez à Sète,<br />
            <span className="italic">comme un local</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#8E9B90]" />
          </div>
        ) : rentals.length === 0 ? (
          <p className="text-center text-[#2D2D2D]/40 font-body py-20">
            Nos locations seront bientôt disponibles. Revenez vite !
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentals.map((r, i) => (
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
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#E5E0DA]/50" />
                    )}
                  </div>
                  {r.rating && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#F7F5F2]/90 backdrop-blur-sm flex items-center gap-1.5">
                      <Star size={12} className="text-[#8E9B90] fill-[#8E9B90]" />
                      <span className="text-xs font-body text-[#2D2D2D]">{r.rating}</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-[#2D2D2D]/80 backdrop-blur-sm">
                    <span className="text-[#F7F5F2] font-heading text-lg">{r.price}€</span>
                    <span className="text-[#F7F5F2]/60 text-xs font-body"> / nuit</span>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-light text-[#2D2D2D] mb-1">{r.name}</h3>
                    {r.type && (
                      <p className="flex items-center gap-1.5 text-[#2D2D2D]/50 text-sm font-body">
                        <MapPin size={12} className="text-[#8E9B90]" />
                        {r.type}
                      </p>
                    )}
                  </div>
                  {r.amenities?.length > 0 && (
                    <div className="flex gap-2">
                      {r.amenities.slice(0, 3).map((key) => {
                        const a = getAmenity(key);
                        if (!a) return null;
                        const Icon = a.Icon;
                        return (
                          <div key={key} className="w-8 h-8 flex items-center justify-center border border-[#E5E0DA]">
                            <Icon size={13} className="text-[#2D2D2D]/60" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-4 text-[#2D2D2D]/50 text-xs font-body border-t border-[#E5E0DA] pt-4">
                  {r.beds != null && <span>{r.beds} chambres</span>}
                  {r.baths != null && <span>{r.baths} sdb</span>}
                  {r.guests != null && <span>{r.guests} voyageurs</span>}
                </div>

                {r.airbnb_url && (
                  <a
                    href={r.airbnb_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2D2D2D] text-[#F7F5F2] text-xs tracking-[0.2em] uppercase font-body hover:bg-[#8E9B90] transition-colors duration-300 min-h-[44px]"
                  >
                    Réserver <ExternalLink size={13} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
