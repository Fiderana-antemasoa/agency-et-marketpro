import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DollarSign, Package, ShoppingCart, Star, TrendingUp, Users } from 'lucide-react';
import { getCurrentUser, getFreelanceStats } from '@/services/mockFreelanceService';
import type { FreelanceStats } from '@/types/freelance';
import { Link } from 'react-router-dom';

const FreelanceDashboard = () => {
  const [stats, setStats] = useState<FreelanceStats | null>(null);
  const user = getCurrentUser();

  useEffect(() => {
    const loadStats = async () => {
      const data = await getFreelanceStats(user.id);
      setStats(data);
    };
    loadStats();
  }, [user.id]);

  if (!stats) {
    return <div className="container mx-auto p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de bord Freelance
          </h1>
          <p className="text-muted-foreground">
            Bienvenue, {user.name} 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_revenue.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_sales}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.active_orders} en cours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.average_rating.toFixed(1)}/5</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.total_reviews} avis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Solde disponible</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.available_balance.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pending_withdrawals.toLocaleString()} en attente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/freelance/services/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Publier un service</h3>
                <p className="text-sm text-muted-foreground">
                  Créez une nouvelle offre de service
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/freelance/products/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Vendre un produit</h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez un produit numérique
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/freelance/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Messagerie</h3>
                <p className="text-sm text-muted-foreground">
                  Discutez avec vos clients
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="services">Mes services</TabsTrigger>
            <TabsTrigger value="products">Mes produits</TabsTrigger>
            <TabsTrigger value="withdrawals">Retraits</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Aucune commande pour le moment
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes services</CardTitle>
                <Link to="/freelance/services/new">
                  <Button size="sm">+ Nouveau service</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Aucun service publié
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes produits numériques</CardTitle>
                <Link to="/freelance/products/new">
                  <Button size="sm">+ Nouveau produit</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Aucun produit en vente
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Historique des retraits</CardTitle>
                <Button size="sm">Demander un retrait</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Solde disponible</p>
                      <p className="text-2xl font-bold text-primary">
                        {stats.available_balance.toLocaleString()} FCFA
                      </p>
                    </div>
                    <Button>Retirer</Button>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun retrait effectué
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FreelanceDashboard;
