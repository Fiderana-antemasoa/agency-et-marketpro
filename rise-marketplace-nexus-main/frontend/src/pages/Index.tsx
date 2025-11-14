import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ShoppingBag, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur votre Marketplace</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Achetez, vendez et trouvez des freelances près de chez vous
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/marketplace">
            <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Marketplace Produits
            </Button>
          </Link>
          <Link to="/freelancers">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
              <Briefcase className="mr-2 h-5 w-5" />
              Trouver des Freelances
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold text-xl mb-2">Marketplace Produits</h3>
            <p className="text-muted-foreground">
              Achetez et vendez des produits près de chez vous
            </p>
          </div>
          
          <div className="text-center p-6">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold text-xl mb-2">Services Freelance</h3>
            <p className="text-muted-foreground">
              Trouvez des experts pour réaliser vos projets
            </p>
          </div>
          
          <div className="text-center p-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold text-xl mb-2">Communauté Active</h3>
            <p className="text-muted-foreground">
              Rejoignez des milliers d'utilisateurs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
