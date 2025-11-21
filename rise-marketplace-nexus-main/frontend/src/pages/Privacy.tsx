import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/register"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'inscription
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Politique de confidentialité de MarketPro
          </h1>
          <p className="text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              La protection de vos données personnelles est une priorité pour MarketPro. La présente
              politique de confidentialité explique quelles données nous collectons, comment nous les
              utilisons, et quels sont vos droits en tant qu&apos;utilisateur de la plateforme.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Données que nous collectons
            </h2>
            <p className="text-gray-700 mb-4">
              Dans le cadre de la création et de l&apos;utilisation de votre compte client, nous pouvons
              collecter les catégories de données suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <span className="font-medium">Données d&apos;identité :</span> prénom, nom, adresse
                e-mail, numéro de téléphone ;
              </li>
              <li>
                <span className="font-medium">Données de compte :</span> identifiants de connexion,
                historique de commandes, préférences ;
              </li>
              <li>
                <span className="font-medium">Données de navigation :</span> pages consultées,
                produits vus, interactions avec les offres ;
              </li>
              <li>
                <span className="font-medium">Données techniques :</span> adresse IP, type de
                navigateur, informations sur l&apos;appareil et cookies.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Finalités du traitement
            </h2>
            <p className="text-gray-700 mb-4">
              Vos données sont traitées pour les finalités suivantes :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Création et gestion de votre compte client ;</li>
              <li>Traitement et suivi de vos commandes ;</li>
              <li>Amélioration de votre expérience sur la plateforme ;</li>
              <li>Envoi d&apos;informations liées à vos commandes ou à votre compte ;</li>
              <li>
                Envoi, avec votre accord, d&apos;offres promotionnelles et de newsletters (que vous
                pouvez désactiver à tout moment) ;
              </li>
              <li>Prévention de la fraude et sécurité de la plateforme.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Base légale du traitement
            </h2>
            <p className="text-gray-700 mb-4">
              Selon les cas, le traitement de vos données repose sur :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                L&apos;exécution d&apos;un contrat (création de compte, exécution de commande) ;
              </li>
              <li>
                Votre consentement (par exemple pour l&apos;envoi de communications marketing) ;
              </li>
              <li>
                Notre intérêt légitime à améliorer nos services et sécuriser la plateforme ;
              </li>
              <li>
                Le respect d&apos;obligations légales (facturation, lutte contre la fraude, etc.).
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Durée de conservation
            </h2>
            <p className="text-gray-700 mb-4">
              Nous conservons vos données personnelles pour la durée nécessaire aux finalités
              poursuivies, augmentée des délais légaux de prescription éventuels. Les données liées à
              votre compte sont conservées tant que votre compte est actif, puis archivées ou
              supprimées conformément à nos obligations légales.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Partage de vos données
            </h2>
            <p className="text-gray-700 mb-4">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Les vendeurs et agences auprès desquels vous passez commande ;</li>
              <li>Nos prestataires techniques (hébergement, paiement, e-mailing, etc.) ;</li>
              <li>Les autorités compétentes, lorsque la loi l&apos;exige.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nous ne revendons jamais vos données personnelles à des tiers pour leur propre
              prospection commerciale.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Vos droits
            </h2>
            <p className="text-gray-700 mb-4">
              Conformément à la réglementation applicable en matière de protection des données, vous
              disposez notamment des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Droit d&apos;accès, de rectification et de suppression de vos données ;</li>
              <li>Droit d&apos;opposition ou de limitation du traitement ;</li>
              <li>
                Droit à la portabilité de vos données, lorsque cela est applicable ;
              </li>
              <li>
                Droit de retirer votre consentement à tout moment pour les traitements fondés sur le
                consentement.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse indiquée dans la
              section « Contact » ci-dessous.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Cookies et traceurs
            </h2>
            <p className="text-gray-700 mb-4">
              La plateforme peut utiliser des cookies et autres traceurs pour assurer son bon
              fonctionnement, mesurer l&apos;audience ou personnaliser votre expérience. Vous pouvez
              configurer votre navigateur pour refuser certains cookies, mais cela peut impacter
              certaines fonctionnalités.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Sécurité</h2>
            <p className="text-gray-700 mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour
              protéger vos données contre la perte, l&apos;accès non autorisé ou la divulgation. Aucun
              système n&apos;étant totalement sécurisé, nous vous recommandons également de choisir un mot
              de passe fort et de le garder confidentiel.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-2">
              Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos
              droits, vous pouvez nous contacter à l&apos;adresse suivante :
            </p>
            <p className="text-gray-700 font-medium">privacy@marketpro.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
