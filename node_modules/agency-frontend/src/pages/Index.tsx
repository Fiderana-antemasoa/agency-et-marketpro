import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, ShoppingCart, Settings, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Gestion des Clients",
      description: "Organisez et suivez tous vos clients depuis un seul endroit",
      href: "/agency/clients"
    },
    {
      icon: ShoppingCart,
      title: "Offres & Achats",
      description: "Gérez les offres et effectuez des achats pour vos clients",
      href: "/agency/offers"
    },
    {
      icon: Settings,
      title: "Outils d'Interaction",
      description: "Messagerie intégrée et suivi de projets collaboratifs",
      href: "/agency/tools"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-primary">
              <Building2 className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Espace <span className="bg-gradient-primary bg-clip-text text-transparent">Agence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gérez vos clients de manière efficace, intuitive et sécurisée avec notre plateforme dédiée aux agences
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gradient-primary hover:bg-primary/90 shadow-primary" asChild>
              <Link to="/agency">
                Accéder au Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/agency/clients">
                Voir mes Clients
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href}>
              <Card className="border-border shadow-soft hover:shadow-medium transition-smooth group cursor-pointer h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 bg-gradient-card rounded-lg w-fit group-hover:bg-gradient-primary transition-smooth">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="border-border shadow-medium bg-gradient-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Plateforme de Confiance
              </h2>
              <p className="text-muted-foreground">
                Rejoignez les agences qui nous font confiance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Agences Partenaires</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">12K+</div>
                <div className="text-muted-foreground">Clients Gérés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-warning" />
                    ))}
                  </div>
                </div>
                <div className="text-muted-foreground">Note Moyenne</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
