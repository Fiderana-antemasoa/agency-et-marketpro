import { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LocationSelector } from './LocationSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/useMarketplace';
import type { Country, ProductCategory } from '@/types/marketplace';

interface MarketplaceHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  selectedLocation?: string;
  onLocationChange: (location: string | undefined, country?: Country) => void;
  onCategoryFilter?: (category: ProductCategory | undefined) => void;
  onSpecialFilter?: (filter: string) => void;
}

export const MarketplaceHeader = ({
  searchQuery,
  onSearchChange,
  onSearch,
  selectedLocation,
  onLocationChange,
  onCategoryFilter,
  onSpecialFilter
}: MarketplaceHeaderProps) => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { categories } = useCategories();
  const [cartCount] = useState(3); // Mock cart count
  const [favoriteCount] = useState(12); // Mock favorites count
  const [showCategories, setShowCategories] = useState(false);

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
                placeholder="Rechercher des produits, catégories, marques, vendeurs..."
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
        <div className="pb-3">
          {/* Barre de navigation principale */}
          <div className="flex items-center gap-6 text-sm mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/20 p-0"
              onClick={() => setShowCategories(!showCategories)}
            >
              Toutes les catégories {showCategories ? '▲' : '▼'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/20 p-0"
              onClick={() => onSpecialFilter?.('best_sellers')}
            >
              Meilleures ventes
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/20 p-0"
              onClick={() => onSpecialFilter?.('newest')}
            >
              Nouveautés
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/20 p-0"
              onClick={() => onSpecialFilter?.('featured')}
            >
              Offres du jour
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-white/20 p-0"
              onClick={() => onSpecialFilter?.('trending')}
            >
              Tendances
            </Button>
          </div>
          
          {/* Dropdown des catégories */}
          {showCategories && (
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 mt-2">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-left h-auto p-2"
                  onClick={() => {
                    onCategoryFilter?.(undefined);
                    setShowCategories(false);
                  }}
                >
                  <span className="text-lg mr-2">🏠</span>
                  <span className="text-sm">Toutes</span>
                </Button>
                {categories.slice(0, 11).map((category) => (
                  <Button
                    key={category.value}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left h-auto p-2 hover:bg-marketplace-orange/10"
                    onClick={() => {
                      onCategoryFilter?.(category.value);
                      setShowCategories(false);
                    }}
                  >
                    <span className="text-lg mr-2">{category.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{category.label}</span>
                      {category.count && (
                        <span className="text-xs text-muted-foreground">({category.count})</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};