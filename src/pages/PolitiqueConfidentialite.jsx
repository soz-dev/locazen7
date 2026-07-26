import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PolitiqueConfidentialite() {
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
        <h1 className="font-heading text-4xl md:text-5xl font-light text-[#1A2535] mb-4">
          Politique de confidentialité
        </h1>
        <p className="font-body text-sm text-[#2D2D2D]/50 mb-12">
          Conforme au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
          et à la loi Informatique et Libertés.
        </p>

        <div className="space-y-10 font-body text-[#2D2D2D]/80 text-sm leading-relaxed">

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              1. Responsable du traitement
            </h2>
            <ul className="space-y-1 pl-4">
              <li><span className="font-medium text-[#1A2535]">Entité :</span> Locazen 7 (entreprise individuelle)</li>
              <li><span className="font-medium text-[#1A2535]">Adresse :</span> 34, rue Lucien Salette, 34200 Sète, France</li>
              <li><span className="font-medium text-[#1A2535]">Email :</span>{" "}
                <a href="mailto:myriamboum34@gmail.com" className="text-[#C4A96B] hover:underline">
                  myriamboum34@gmail.com
                </a>
              </li>
              <li><span className="font-medium text-[#1A2535]">Téléphone :</span> 06.59.76.91.94</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              2. Données collectées
            </h2>
            <p className="mb-3">Lors de votre utilisation du site, nous pouvons collecter les données suivantes :</p>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-[#1A2535] mb-1">Via le formulaire de contact :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Objet de la demande</li>
                  <li>Contenu du message</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[#1A2535] mb-1">Via le formulaire d'avis propriétaires :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nom</li>
                  <li>Commentaire</li>
                  <li>Note (1 à 5 étoiles)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[#1A2535] mb-1">Données de navigation (collectées automatiquement) :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Adresse IP (traitée par GitHub Pages)</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Préférence de langue et de profil (stockée localement via <code className="bg-black/5 px-1 rounded">localStorage</code>)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              3. Finalités du traitement et bases légales
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1A2535]/5">
                    <th className="text-left p-3 font-medium text-[#1A2535] border border-[#1A2535]/10">Finalité</th>
                    <th className="text-left p-3 font-medium text-[#1A2535] border border-[#1A2535]/10">Base légale (RGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Répondre aux demandes de contact", "Intérêt légitime (art. 6.1.f)"],
                    ["Gestion des avis et témoignages", "Consentement (art. 6.1.a)"],
                    ["Amélioration du service", "Intérêt légitime (art. 6.1.f)"],
                    ["Mémorisation du profil visiteur", "Consentement implicite via interaction"],
                    ["Hébergement du site (GitHub Pages)", "Exécution contractuelle (art. 6.1.b)"],
                  ].map(([fin, base], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : ""}>
                      <td className="p-3 border border-[#1A2535]/10">{fin}</td>
                      <td className="p-3 border border-[#1A2535]/10 text-[#2D2D2D]/60">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              4. Durée de conservation
            </h2>
            <ul className="space-y-2 pl-4">
              <li><span className="font-medium text-[#1A2535]">Données de contact :</span> 3 ans à compter du dernier échange (prescription civile)</li>
              <li><span className="font-medium text-[#1A2535]">Avis propriétaires :</span> Durée de publication, puis supprimés sur demande</li>
              <li><span className="font-medium text-[#1A2535]">Données de navigation :</span> Conservées selon la politique de GitHub Pages (max. 90 jours)</li>
              <li><span className="font-medium text-[#1A2535]">localStorage :</span> Effacé à la déconnexion ou sur demande de l'utilisateur</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              5. Destinataires des données
            </h2>
            <p className="mb-3">
              Vos données sont traitées uniquement par Locazen 7 et les sous-traitants techniques suivants,
              dans le cadre strict de la prestation de service :
            </p>
            <ul className="space-y-2 pl-4">
              <li><span className="font-medium text-[#1A2535]">FormSubmit</span> — Routage des emails de contact (<a href="https://formsubmit.co/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C4A96B] hover:underline">politique de confidentialité</a>)</li>
              <li><span className="font-medium text-[#1A2535]">GitHub Pages</span> — Hébergement du site (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[#C4A96B] hover:underline">politique de confidentialité</a>)</li>
              <li><span className="font-medium text-[#1A2535]">base44</span> — Backend applicatif (stockage des avis)</li>
            </ul>
            <p className="mt-3">
              Aucune donnée n'est vendue, cédée ou transmise à des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              6. Transferts hors UE
            </h2>
            <p>
              GitHub, Inc. est une société américaine. Les transferts de données vers les États-Unis
              sont encadrés par les garanties appropriées prévues par le RGPD (clauses contractuelles
              types ou décision d'adéquation EU-US Data Privacy Framework).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              7. Cookies et stockage local
            </h2>
            <p className="mb-3">Ce site n'utilise <strong>pas de cookies de traçage ou publicitaires</strong>. Les seuls mécanismes de stockage utilisés sont :</p>
            <ul className="space-y-2 pl-4">
              <li>
                <span className="font-medium text-[#1A2535]">localStorage</span> — Mémorisation de votre profil (propriétaire/voyageur) et préférence de langue. Ces données restent sur votre appareil et ne sont jamais transmises à nos serveurs.
              </li>
              <li>
                <span className="font-medium text-[#1A2535]">sessionStorage</span> — Session d'administration temporaire. Effacée à la fermeture du navigateur.
              </li>
            </ul>
            <p className="mt-3">
              Vous pouvez effacer ces données à tout moment via les paramètres de votre navigateur
              (Outils → Confidentialité → Données de sites).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              8. Vos droits (RGPD)
            </h2>
            <p className="mb-3">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
            <ul className="space-y-2 pl-4">
              <li><span className="font-medium text-[#1A2535]">Droit d'accès</span> — Obtenir une copie de vos données personnelles</li>
              <li><span className="font-medium text-[#1A2535]">Droit de rectification</span> — Corriger des données inexactes ou incomplètes</li>
              <li><span className="font-medium text-[#1A2535]">Droit à l'effacement</span> — Demander la suppression de vos données ("droit à l'oubli")</li>
              <li><span className="font-medium text-[#1A2535]">Droit à la limitation</span> — Suspendre temporairement le traitement</li>
              <li><span className="font-medium text-[#1A2535]">Droit d'opposition</span> — S'opposer au traitement fondé sur l'intérêt légitime</li>
              <li><span className="font-medium text-[#1A2535]">Droit à la portabilité</span> — Recevoir vos données dans un format structuré</li>
              <li><span className="font-medium text-[#1A2535]">Droit de retrait du consentement</span> — À tout moment, sans effet rétroactif</li>
            </ul>
            <div className="mt-4 p-4 bg-[#1A2535]/5 border-l-4 border-[#C4A96B]">
              <p>
                Pour exercer vos droits, contactez-nous par email à{" "}
                <a href="mailto:myriamboum34@gmail.com" className="text-[#C4A96B] hover:underline">
                  myriamboum34@gmail.com
                </a>{" "}
                en précisant votre demande. Nous répondrons dans un délai maximum de <strong>30 jours</strong>.
              </p>
              <p className="mt-2">
                En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la{" "}
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-[#C4A96B] hover:underline">
                  CNIL
                </a>{" "}
                (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              9. Sécurité
            </h2>
            <p>
              Locazen 7 met en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, perte, altération ou divulgation.
              Le site est servi exclusivement via HTTPS (protocole sécurisé).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-light text-[#1A2535] mb-4 pb-2 border-b border-[#1A2535]/10">
              10. Modifications de la présente politique
            </h2>
            <p>
              Locazen 7 se réserve le droit de modifier la présente politique de confidentialité
              à tout moment. Les modifications prennent effet dès leur publication sur cette page.
              Nous vous encourageons à la consulter régulièrement.
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
          <Link to="/mentions-legales" className="text-xs tracking-[0.2em] uppercase font-body text-[#2D2D2D]/40 hover:text-[#1A2535] transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </div>
  );
}
