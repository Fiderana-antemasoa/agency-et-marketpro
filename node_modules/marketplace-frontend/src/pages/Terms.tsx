import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            Conditions d&apos;utilisation de MarketPro
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
              1. Objet de la plateforme
            </h2>
            <p className="text-gray-700 mb-4">
              MarketPro est une place de marché en ligne permettant aux agences et vendeurs
              professionnels de proposer leurs offres, et aux clients de découvrir, comparer et
              acheter des produits ou services. En créant un compte et en utilisant la plateforme,
              vous acceptez intégralement les présentes conditions d&apos;utilisation.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Création de compte et sécurité
            </h2>
            <p className="text-gray-700 mb-4">
              Pour utiliser certaines fonctionnalités (commande, suivi, favoris, etc.), vous devez
              créer un compte client. Vous vous engagez à fournir des informations exactes,
              complètes et à jour, et à les mettre à jour en cas de changement.
            </p>
            <p className="text-gray-700 mb-4">
              Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les
              activités effectuées depuis votre compte. En cas de suspicion d&apos;utilisation
              frauduleuse, vous devez nous en informer sans délai.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Utilisation acceptable de MarketPro
            </h2>
            <p className="text-gray-700 mb-4">
              Vous vous engagez à utiliser la plateforme dans le respect des lois en vigueur et à ne
              pas :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Usurper l&apos;identité d&apos;un tiers ou utiliser un compte sans autorisation ;</li>
              <li>
                Diffuser des contenus illégaux, injurieux, diffamatoires, discriminatoires ou
                portant atteinte aux droits d&apos;autrui ;
              </li>
              <li>
                Tenter de contourner les mesures de sécurité ou d&apos;accéder à des données auxquelles
                vous n&apos;avez pas droit ;
              </li>
              <li>
                Perturber le bon fonctionnement de la plateforme (spams, attaques, robots non
                autorisés, etc.).
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Commandes, prix et paiements
            </h2>
            <p className="text-gray-700 mb-4">
              Les informations sur les produits, les prix et les conditions de livraison sont
              fournies par les vendeurs ou agences partenaires. Nous mettons tout en œuvre pour
              afficher des informations à jour, mais des erreurs peuvent exceptionnellement se
              produire.
            </p>
            <p className="text-gray-700 mb-4">
              La validation d&apos;une commande implique l&apos;acceptation du prix et des conditions
              associées. Le paiement est sécurisé via nos prestataires de paiement. Certaines
              commandes peuvent être refusées ou annulées, par exemple en cas de suspicion de fraude
              ou d&apos;erreur manifeste.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Données personnelles et confidentialité
            </h2>
            <p className="text-gray-700 mb-4">
              Nous collectons et traitons certaines données personnelles dans le cadre de la
              gestion des comptes, des commandes et de l&apos;amélioration de nos services. Pour en
              savoir plus sur les types de données collectées, les finalités et vos droits,
              veuillez consulter notre{' '}
              <Link to="/privacy" className="text-marketplace-blue hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Responsabilités
            </h2>
            <p className="text-gray-700 mb-4">
              MarketPro agit en tant qu&apos;intermédiaire entre les vendeurs et les clients. Chaque
              vendeur demeure responsable des offres qu&apos;il publie, de leur conformité et de la
              bonne exécution des prestations ou livraisons.
            </p>
            <p className="text-gray-700 mb-4">
              Nous ne pourrons être tenus responsables des dommages indirects, pertes de données ou
              pertes financières résultant de l&apos;utilisation de la plateforme, sauf disposition
              légale impérative contraire.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Suspension et suppression du compte
            </h2>
            <p className="text-gray-700 mb-4">
              Nous nous réservons le droit de suspendre ou de supprimer un compte utilisateur en cas
              de non-respect grave ou répété des présentes conditions, de fraude, ou de tout
              comportement portant préjudice à la plateforme, aux vendeurs ou aux autres clients.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Modification des conditions
            </h2>
            <p className="text-gray-700 mb-4">
              Les présentes conditions d&apos;utilisation peuvent être mises à jour pour tenir compte
              de l&apos;évolution de la plateforme, de la réglementation ou de nos services. En cas de
              changement majeur, nous nous efforcerons de vous en informer par les canaux
              appropriés. L&apos;utilisation continue de la plateforme après modification vaut
              acceptation des nouvelles conditions.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact</h2>
            <p className="text-gray-700 mb-2">
              Pour toute question concernant ces conditions d&apos;utilisation ou le fonctionnement de
              MarketPro, vous pouvez nous contacter à l&apos;adresse suivante :
            </p>
            <p className="text-gray-700 font-medium">support@marketpro.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
