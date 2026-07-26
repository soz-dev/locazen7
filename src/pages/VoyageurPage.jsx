import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/locazen/Navbar";
import Hero from "@/components/locazen/Hero";
import TravelerRentals from "@/components/locazen/TravelerRentals";
import MapSete from "@/components/locazen/MapSete";
import Testimonials from "@/components/locazen/Testimonials";
import Weather from "@/components/locazen/Weather";
import SeaConditions from "@/components/locazen/SeaConditions";
import EventsAgenda from "@/components/locazen/EventsAgenda";
import TravelerTarifs from "@/components/locazen/TravelerTarifs";
import StayCalculator from "@/components/locazen/StayCalculator";
import Sete from "@/components/locazen/Sete";
import FAQ from "@/components/locazen/FAQ";
import Contact from "@/components/locazen/Contact";
import Footer from "@/components/locazen/Footer";

const SETE_AERIAL = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

export default function VoyageurPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSwitch = () => {
    localStorage.removeItem("locazen_visitor");
    navigate("/");
  };

  return (
    <motion.div
      key="voyageur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#F7F5F2] min-h-screen"
    >
      <Navbar visitorType="voyageur" onSwitch={handleSwitch} />
      <Hero
        image={SETE_AERIAL}
        eyebrow={t("hero.voyageur.eyebrow")}
        tagline={t("hero.voyageur.tagline")}
        ctaLabel={t("hero.voyageur.cta")}
        ctaHref="#locations"
        visitorType="voyageur"
      />
      <TravelerRentals />
      <MapSete />
      <Testimonials />
      <Weather />
      <SeaConditions />
      <EventsAgenda />
      <TravelerTarifs />
      <StayCalculator />
      <Sete />
      <FAQ visitorType="voyageur" />
      <Contact visitorType="voyageur" />
      <Footer visitorType="voyageur" />
    </motion.div>
  );
}
