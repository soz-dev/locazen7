import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SelectionScreen from "@/components/locazen/SelectionScreen";
import Navbar from "@/components/locazen/Navbar";
import Hero from "@/components/locazen/Hero";
import Services from "@/components/locazen/Services";
import About from "@/components/locazen/About";
import Prestations from "@/components/locazen/Prestations";
import Sete from "@/components/locazen/Sete";
import Footer from "@/components/locazen/Footer";
import TravelerRentals from "@/components/locazen/TravelerRentals";
import TravelerTarifs from "@/components/locazen/TravelerTarifs";
import Weather from "@/components/locazen/Weather";
import OwnerPricing from "@/components/locazen/OwnerPricing";
import Contact from "@/components/locazen/Contact";
import HowItWorks from "@/components/locazen/HowItWorks";
import BeforeAfter from "@/components/locazen/BeforeAfter";
import Testimonials from "@/components/locazen/Testimonials";
import FAQ from "@/components/locazen/FAQ";
import StayCalculator from "@/components/locazen/StayCalculator";
import RevenueSimulator from "@/components/locazen/RevenueSimulator";
import OwnerTestimonials from "@/components/locazen/OwnerTestimonials";
import SeaConditions from "@/components/locazen/SeaConditions";
import EventsAgenda from "@/components/locazen/EventsAgenda";

const SETE_AERIAL    = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";
const BED_IMMACULATE = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80";

export default function Home() {
  const { t } = useTranslation();
  const [visitorType, setVisitorType] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("locazen_visitor");
    if (stored) setVisitorType(stored);
  }, []);

  const handleSelect = (type) => {
    setVisitorType(type);
    localStorage.setItem("locazen_visitor", type);
    window.scrollTo(0, 0);
  };

  const handleSwitch = () => {
    setVisitorType(null);
    localStorage.removeItem("locazen_visitor");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <AnimatePresence mode="wait">
        {!visitorType ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SelectionScreen onSelect={handleSelect} />
          </motion.div>
        ) : visitorType === "voyageur" ? (
          <motion.div
            key="voyageur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar visitorType={visitorType} onSwitch={handleSwitch} />
            <Hero
              image={SETE_AERIAL}
              wordTop="Séjour"
              wordBottom="Sète"
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
        ) : (
          <motion.div
            key="proprietaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar visitorType={visitorType} onSwitch={handleSwitch} />
            <Hero
              image={BED_IMMACULATE}
              wordTop="Conciergerie"
              wordBottom="Sète"
              eyebrow={t("hero.owner.eyebrow")}
              tagline={t("hero.owner.tagline")}
              ctaLabel={t("hero.owner.cta")}
              ctaHref="#services"
              visitorType="proprietaire"
            />
            <Services />
            <HowItWorks />
            <About />
            <BeforeAfter />
            <Prestations />
            <OwnerPricing />
            <RevenueSimulator />
            <Sete />
            <OwnerTestimonials />
            <FAQ visitorType="proprietaire" />
            <Contact visitorType="proprietaire" />
            <Footer visitorType="proprietaire" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
