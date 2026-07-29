import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MentionsLegales() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Header minimal */}
      <div className="bg-[#1A2535] py-6 px-6">
        <Link to="/" className="font-heading text-2xl tracking-[0.2em] font-light text-[#F7F5F2]">
          LOCAZEN 7
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-16 py-20 md:py-28">
        <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1A2535] mb-12">
          Mentions légales
        </h1>

        <div className="space-y-10 font-body text-[#2D2D2D]/80 text-sm leading-relaxed">

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              1. Éditeur du site
            </h2>
            <p>Le présent site web est édité par :</p>
            <ul className="mt-3 space-y-1 pl-4">
              <li><span className="font-medium text-[#1A2535]">Dénomination :</span> Locazen 7</li>
              <li><span className="font-medium text-[#1A2535]">Forme juridique :</span> Entreprise individuelle</li>
              <li><span className="font-medium text-[#1A2535]">Siège social :</span> 34, rue Lucien Salette, 34200 Sète, France</li>
              <li><span className="font-medium text-[#1A2535]">SIRET :</span> <span className="text-[#C4A96B]">[À COMPLÉTER]</span></li>
              <li><span className="font-medium text-[#1A2535]">Téléphone :</span> 06.59.76.91.94</li>
              <li><span className="font-medium text-[#1A2535]">Email :</span>{" "}
                <a href="mailto:myriamboum34@gmail.com" className="text-[#C4A96B] hover:underline">
                  myriamboum34@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              2. Directeur de la publication
            </h2>
            <p>
              Le directeur de la publication est le responsable de l'entreprise individuelle Locazen 7,
              joignable à l'adresse email indiquée ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              3. Hébergeur
            </h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-3 space-y-1 pl-4">
              <li><span className="font-medium text-[#1A2535]">Hébergeur du site :</span> GitHub, Inc. — 88 Colin P Kelly Jr Street, San Francisco, CA 94107, États-Unis —{" "}
                <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" className="text-[#C4A96B] hover:underline">pages.github.com</a>
              </li>
              <li><span className="font-medium text-[#1A2535]">Gestionnaire du nom de domaine :</span> OVH SAS — 2, rue Kellermann, 59100 Roubaix, France —{" "}
                <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer" className="text-[#C4A96B] hover:underline">ovh.com</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              4. Activité
            </h2>
            <p>
              Locazen 7 est une conciergerie locative proposant des services de gestion de biens
              immobiliers en location courte et moyenne durée, à destination des propriétaires et
              des voyageurs, principalement sur le territoire de Sète et ses environs (Hérault, France).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              5. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes,
              sons, logiciels) est la propriété exclusive de Locazen 7, à l'exception des contenus
              fournis par des tiers (images Unsplash sous licence libre, Wikimedia Commons).
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication
              de ces différents éléments est strictement interdite sans l'accord exprès écrit de
              Locazen 7.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              6. Limitation de responsabilité
            </h2>
            <p>
              Locazen 7 s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées
              sur ce site. Toutefois, Locazen 7 ne peut garantir l'exactitude, la précision ou
              l'exhaustivité des informations mises à disposition sur ce site. En conséquence,
              Locazen 7 décline toute responsabilité pour toute imprécision, inexactitude ou omission
              portant sur des informations disponibles sur ce site.
            </p>
            <p className="mt-3">
              Locazen 7 ne saurait être tenu responsable des dommages directs ou indirects résultant
              de l'accès au site ou de son utilisation, y compris l'inaccessibilité, les pertes de
              données, les détériorations, destructions ou virus qui pourraient affecter l'équipement
              informatique de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              7. Liens hypertextes
            </h2>
            <p>
              Le site peut contenir des liens vers d'autres sites internet. Locazen 7 n'a aucun
              contrôle sur ces sites tiers et n'assume aucune responsabilité quant à leurs contenus
              ou pratiques. La présence de ces liens ne constitue pas une approbation de ces sites
              ou de leur contenu.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              8. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige
              relatif à leur interprétation et/ou à leur exécution, les tribunaux français seront
              seuls compétents.
            </p>
            <p className="mt-4 text-[#2D2D2D]/50 text-xs">
              Dernière mise à jour : juillet 2026
            </p>
          </section>
        </div>

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-[#1A2535]/10 flex gap-6">
          <Link to="/" className="text-xs tracking-[0.2em] uppercase font-body text-[#C4A96B] hover:text-[#1A2535] transition-colors">
            ← Retour à l'accueil
          </Link>
          <Link to="/politique-confidentialite" className="text-xs tracking-[0.2em] uppercase font-body text-[#2D2D2D]/40 hover:text-[#1A2535] transition-colors">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </div>
  );
}
