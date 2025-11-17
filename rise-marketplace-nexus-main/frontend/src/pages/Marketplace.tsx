import { useState, useEffect, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ProductFilters } from '@/components/marketplace/ProductFilters';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace, useMarketplaceFilters } from '@/hooks/useMarketplace';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Country, MarketplaceProduct } from '@/types/marketplace';

export default function Marketplace() {
  const { filters, updateFilters, resetFilters, activeFiltersCount } = useMarketplaceFilters();
  const { products: allProducts, loading, pagination, changePage } = useMarketplace({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [showFilters, setShowFilters] = useState(false);

  // Filtrage dynamique complet (recherche + filtres)
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // 1. Filtrage par recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      products = products.filter(product => {
        // Recherche dans le titre du produit
        const titleMatch = product.title.toLowerCase().includes(query);
        
        // Recherche dans la description
        const descriptionMatch = product.description.toLowerCase().includes(query);
        
        // Recherche dans les tags
        const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(query));
        
        // Recherche dans le nom du vendeur
        const sellerMatch = product.user?.name?.toLowerCase().includes(query) || false;
        
        // Recherche dans la catégorie
        const categoryMatch = product.category.toLowerCase().includes(query);
        
        // Recherche dans la sous-catégorie
        const subcategoryMatch = product.subcategory?.toLowerCase().includes(query) || false;
        
        // Recherche dans la marque
        const brandMatch = product.brand?.toLowerCase().includes(query) || false;
        
        return titleMatch || descriptionMatch || tagsMatch || sellerMatch || categoryMatch || subcategoryMatch || brandMatch;
      });
    }

    // 2. Filtrage par catégories
    if (filters.category) {
      if (Array.isArray(filters.category)) {
        products = products.filter(product => 
          filters.category!.includes(product.category)
        );
      } else {
        products = products.filter(product => product.category === filters.category);
      }
    }

    // 3. Filtrage par prix
    if (filters.price_min !== undefined) {
      products = products.filter(product => product.price >= filters.price_min!);
    }
    if (filters.price_max !== undefined) {
      products = products.filter(product => product.price <= filters.price_max!);
    }

    // 4. Filtrage par condition
    if (filters.condition) {
      products = products.filter(product => product.condition === filters.condition);
    }

    // 5. Filtrage par marque
    if (filters.brand) {
      products = products.filter(product => 
        (product.brand || '').toLowerCase() === String(filters.brand).toLowerCase()
      );
    }

    // 6. Filtrage par tags
    if (filters.tags && filters.tags.length > 0) {
      products = products.filter(product =>
        filters.tags!.some(tag => product.tags.includes(tag))
      );
    }

    // 7. Filtrage par featured
    if (filters.is_featured) {
      products = products.filter(product => product.is_featured);
    }

    // 8. Filtrage par trending
    if (filters.is_trending) {
      products = products.filter(product => product.is_trending);
    }

    // 9. Filtrage par ville
    if (filters.city) {
      products = products.filter(product => 
        (product.city || '').toLowerCase().includes(filters.city!.toLowerCase())
      );
    }

    return products;
  }, [allProducts, searchQuery, filters]);

  const handleSearch = () => {
    updateFilters({ search: searchQuery || undefined });
  };

  const handleSort = (sortBy: string) => {
    updateFilters({ sort_by: sortBy as any });
  };

  const handleLocationChange = (location: string | undefined, country?: Country) => {
    setSelectedLocation(location);
    updateFilters({ 
      country: country,
      city: location 
    });
  };

  const handleCategoryFilter = (category: any) => {
    updateFilters({ category });
  };

  const handleSpecialFilter = (filter: string) => {
    switch (filter) {
      case 'best_sellers':
        updateFilters({ sort_by: 'sales' });
        break;
      case 'newest':
        updateFilters({ sort_by: 'created_at' });
        break;
      case 'featured':
        updateFilters({ is_featured: true });
        break;
      case 'trending':
        updateFilters({ is_trending: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MarketplaceHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        onCategoryFilter={handleCategoryFilter}
        onSpecialFilter={handleSpecialFilter}
      />

      {/* Breadcrumb & Stats */}
      <div className="bg-marketplace-gray/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Accueil</span>
              <span>/</span>
              <span className="text-foreground font-medium">Marketplace</span>
              {selectedLocation && (
                <>
                  <span>/</span>
                  <span className="text-foreground font-medium">{selectedLocation}</span>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {!loading && (
                <span>
                  {searchQuery.trim() || activeFiltersCount > 0
                    ? `${filteredProducts.length} produit(s) trouvé(s)` 
                    : `${allProducts.length} produits disponibles`
                  }
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Toggle & Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            
            <div className="hidden lg:flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {activeFiltersCount > 0 ? (
                <Badge variant="secondary">{activeFiltersCount}</Badge>
              ) : (
                <span className="text-sm text-muted-foreground">Aucun</span>
              )}
            </div>
          </div>

          <Select onValueChange={handleSort} defaultValue="created_at">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at">Plus récents</SelectItem>
              <SelectItem value="price">Prix croissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
              <SelectItem value="sales">Plus vendus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <ProductFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onReset={resetFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-96 bg-marketplace-gray animate-pulse rounded-lg shadow-card" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
                <Button onClick={() => { resetFilters(); setSearchQuery(''); }} variant="outline">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="text-sm text-muted-foreground">
                    Affichage de {(pagination.current_page - 1) * pagination.per_page + 1} à {Math.min(pagination.current_page * pagination.per_page, pagination.total)} sur {pagination.total} produits
                  </div>
                  {selectedLocation && (
                    <Badge variant="outline" className="bg-marketplace-blue/10 text-marketplace-blue border-marketplace-blue/20">
                      📍 {selectedLocation}
                    </Badge>
                  )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={(id) => window.location.href = `/marketplace/product/${id}`}
                      onFavoriteClick={(id, isFav) => console.log('Toggle favorite', id, isFav)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => changePage(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                    >
                      Précédent
                    </Button>
                    
                    {[...Array(Math.min(pagination.last_page, 5))].map((_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={pagination.current_page === page ? "default" : "outline"}
                          onClick={() => changePage(page)}
                          className={pagination.current_page === page ? "bg-primary hover:bg-primary-hover" : ""}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      onClick={() => changePage(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                    >
                      Suivant
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}