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
import MotasticPromo from "@/components/locazen/MotasticPromo";
import FAQ from "@/components/locazen/FAQ";
import Contact from "@/components/locazen/Contact";
import BrassensBlock from "@/components/locazen/BrassensBlock";
import Footer from "@/components/locazen/Footer";
import SEO from "@/components/SEO";

const BED_IMMACULATE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1920&q=80";

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
      <SEO
        title="Conciergerie Sète | Gestion Locative &amp; Ménage"
        description="Locazen 7, conciergerie professionnelle à Sète : gestion locative complète, ménage, accueil voyageurs et gestion Airbnb. Confiez votre bien à des experts. Sète (34200)."
        canonical="/proprietaire"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Locazen 7 — Conciergerie Propriétaires",
          "description": "Gestion locative et conciergerie pour propriétaires à Sète : ménage, accueil des voyageurs, gestion Airbnb et Booking. Sète (34200).",
          "url": "https://www.locazen7.fr/proprietaire",
          "telephone": "+33659769194",
          "email": "myriamboum34@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "34 rue Lucien Salette",
            "addressLocality": "Sète",
            "postalCode": "34200",
            "addressCountry": "FR"
          }
        }}
      />
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
      <MotasticPromo audience="proprietaire" />
      <FAQ visitorType="proprietaire" />
      <Contact visitorType="proprietaire" />
      <BrassensBlock />
      <Footer visitorType="proprietaire" />
    </motion.div>
  );
}
