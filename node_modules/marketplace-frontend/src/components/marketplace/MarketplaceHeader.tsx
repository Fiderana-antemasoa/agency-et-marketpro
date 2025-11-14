import { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LocationSelector } from './LocationSelector';
import { useAuth } from '@/contexts/AuthContext';
import type { Country } from '@/types/marketplace';

interface MarketplaceHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  selectedLocation?: string;
  onLocationChange: (location: string | undefined, country?: Country) => void;
}

export const MarketplaceHeader = ({
  searchQuery,
  onSearchChange,
  onSearch,
  selectedLocation,
  onLocationChange
}: MarketplaceHeaderProps) => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [cartCount] = useState(3); // Mock cart count
  const [favoriteCount] = useState(12); // Mock favorites count

  // Debug: Afficher l'état d'authentification
  console.log('MarketplaceHeader - isAuthenticated:', isAuthenticated, 'user:', user, 'isLoading:', isLoading);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <div className="bg-gradient-to-r from-marketplace-orange to-accent shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={onLocationChange}
            />
          </div>
          <div className="flex items-center gap-3 text-primary-foreground">
            {isLoading ? (
              // Indicateur de chargement
              <span className="text-white/60 text-xs">Chargement...</span>
            ) : !isAuthenticated ? (
              // Boutons de connexion (quand pas connecté)
              <>
                <Button 
                  onClick={() => window.location.href = '/login'}
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:inline-flex text-primary-foreground hover:bg-white/20 text-xs px-3 py-1 h-7"
                >
                  Se connecter
                </Button>
                <span className="hidden md:inline text-white/60">•</span>
                <Button 
                  onClick={() => window.location.href = 'http://localhost:5173/login'}
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:inline-flex text-primary-foreground hover:bg-white/20 text-xs px-3 py-1 h-7"
                >
                  Agency
                </Button>
                <span className="hidden md:inline text-white/60">•</span>
                <Button 
                  onClick={() => window.location.href = '/register'}
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:inline-flex text-primary-foreground hover:bg-white/20 text-xs px-3 py-1 h-7"
                >
                  S'inscrire
                </Button>
              </>
            ) : (
              // Les 3 icônes remplacent les 3 boutons (quand connecté)
              <>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 relative">
                  <Heart className="h-4 w-4" />
                  {favoriteCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-marketplace-blue text-white">
                      {favoriteCount}
                    </Badge>
                  )}
                </Button>
                
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-success text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>

                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="sm" 
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline ml-1 text-xs">Compte</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-6">
            <div className="text-2xl font-bold text-primary-foreground">
              Market<span className="text-marketplace-yellow">Pro</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="flex">
              <Input
                placeholder="Rechercher des produits, marques, vendeurs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                className="rounded-l-lg rounded-r-none border-r-0 bg-white/95 focus:bg-white border-white/30 focus:border-marketplace-yellow"
              />
              <Button 
                onClick={onSearch}
                className="rounded-l-none bg-marketplace-yellow hover:bg-marketplace-yellow/90 text-primary border-marketplace-yellow"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Menu mobile */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="md:hidden text-primary-foreground hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 pb-3 text-sm">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 p-0">
            Toutes les catégories
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 p-0">
            Meilleures ventes
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 p-0">
            Nouveautés
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 p-0">
            Offres du jour
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 p-0">
            Livraison gratuite
          </Button>
        </div>
      </div>
    </div>
  );
};