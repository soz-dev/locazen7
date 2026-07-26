import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQS = {
  voyageur: [
    {
      q: "Comment puis-je réserver ?",
      a: "Vous pouvez réserver directement via nos annonces Airbnb en cliquant sur « Voir l'annonce », ou nous contacter via le formulaire en bas de page pour une réservation directe.",
    },
    {
      q: "Les animaux de compagnie sont-ils acceptés ?",
      a: "Cela dépend du logement. La présence ou non d'animaux est précisée dans chaque annonce. N'hésitez pas à nous contacter pour en savoir plus.",
    },
    {
      q: "Quelle est la politique d'annulation ?",
      a: "Notre politique est flexible. Les conditions varient selon la plateforme de réservation et sont toujours précisées avant la confirmation.",
    },
    {
      q: "À quelle heure est le check-in / check-out ?",
      a: "Le check-in se fait à partir de 16h, le check-out avant 11h. Des horaires flexibles peuvent être arrangés selon les disponibilités.",
    },
    {
      q: "Le linge de maison est-il fourni ?",
      a: "Oui, draps et serviettes propres sont inclus dans tous nos logements, sans supplément.",
    },
  ],
  proprietaire: [
    {
      q: "Combien coûtent vos services ?",
      a: "Nos formules et tarifs sont détaillés dans la section ci-dessus. Nous proposons plusieurs niveaux de service adaptés à vos besoins.",
    },
    {
      q: "Puis-je utiliser mon bien à titre personnel ?",
      a: "Absolument. Vous gardez la maîtrise de votre calendrier. Il suffit de nous indiquer vos périodes d'occupation à l'avance.",
    },
    {
      q: "Comment gérez-vous les dégradations ?",
      a: "Nous effectuons un état des lieux à chaque départ. Les dépôts de garantie sont gérés via les plateformes, et nous assurons le suivi en cas de litige.",
    },
    {
      q: "Sur quelles plateformes publiez-vous les annonces ?",
      a: "Nous gérons vos annonces sur Airbnb, Booking.com et Abritel, en optimisant prix et contenu pour maximiser votre taux d'occupation.",
    },
    {
      q: "Quel est le délai de prise en charge ?",
      a: "En général, nous débutons la prise en charge sous 2 semaines après signature du mandat de gestion.",
    },
  ],
};

function FAQItem({ item, isOpen, onToggle, isProprio }) {
  return (
    <div className={`border-b ${isProprio ? "border-[#1A2535]/12" : "border-[#0891B2]/12"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-6"
      >
        <span className={`font-body text-sm leading-snug ${isProprio ? "text-[#1A2535]" : "text-[#0C4A6E]"}`}>
          {item.q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-colors ${
            isProprio
              ? isOpen ? "border-[#C4A96B] text-[#C4A96B]" : "border-[#1A2535]/25 text-[#1A2535]/35"
              : isOpen ? "border-[#0891B2] text-[#0891B2]" : "border-[#0C4A6E]/25 text-[#0C4A6E]/35"
          }`}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`pb-5 text-sm font-body leading-relaxed ${isProprio ? "text-[#1A2535]/55" : "text-[#0C4A6E]/55"}`}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ visitorType }) {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState(null);
  const isProprio = visitorType === "proprietaire";
  const items = t(isProprio ? "faq.owner" : "faq.traveler", { returnObjects: true });

  return (
    <section id="faq" className={`py-[5px] ${isProprio ? "bg-[#F7F5F2] border-t border-[#2D2D2D]/10" : "bg-white border-t border-[#0C4A6E]/10"}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className={`text-xs tracking-[0.3em] uppercase font-body mb-4 ${isProprio ? "text-[#C4A96B]" : "text-[#0891B2]"}`}>
            {t("faq.eyebrow")}
          </p>
          <h2 className={`font-heading text-4xl md:text-5xl font-light leading-tight ${isProprio ? "text-[#1A2535]" : "text-[#0C4A6E]"}`}>
            {t("faq.title")}
          </h2>
        </motion.div>

        <div className={`border-t ${isProprio ? "border-[#1A2535]/12" : "border-[#0891B2]/12"}`}>
          {Array.isArray(items) && items.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              isProprio={isProprio}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
