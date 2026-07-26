import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/locazen/Navbar";
import Hero from "@/components/locazen/Hero";
import EtapesProprietaire from "@/components/locazen/EtapesProprietaire";
import About from "@/components/locazen/About";
import RevenueSimulator from "@/components/locazen/RevenueSimulator";
import Sete from "@/components/locazen/Sete";
import OwnerTestimonials from "@/components/locazen/OwnerTestimonials";
import FAQ from "@/components/locazen/FAQ";
import Contact from "@/components/locazen/Contact";
import Footer from "@/components/locazen/Footer";

const BED_IMMACULATE = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=80";

export default function ProprietairePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSwitch = () => {
    localStorage.removeItem("locazen_visitor");
    navigate("/");
  };

  return (
    <motion.div
      key="proprietaire"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-[#F7F5F2] min-h-screen"
    >
      <Navbar visitorType="proprietaire" onSwitch={handleSwitch} />
      <Hero
        image={BED_IMMACULATE}
        eyebrow={t("hero.owner.eyebrow")}
        tagline={t("hero.owner.tagline")}
        ctaLabel={t("hero.owner.cta")}
        ctaHref="#etapes"
        visitorType="proprietaire"
      />
      <EtapesProprietaire />
      <About />
      <RevenueSimulator />
      <Sete />
      <OwnerTestimonials />
      <FAQ visitorType="proprietaire" />
      <Contact visitorType="proprietaire" />
      <Footer visitorType="proprietaire" />
    </motion.div>
  );
}
