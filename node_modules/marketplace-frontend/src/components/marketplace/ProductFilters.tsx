import { useState, useEffect, useCallback } from 'react';
import { Filter, X, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { CountryFilter } from './CountryFilter';
import type { MarketplaceFilters, CategoryOption, Country } from '@/types/marketplace';
import { useCategories } from '@/hooks/useMarketplace';
import { getCachedTags, getPopularTags, refreshTags } from '@/services/tagsService';

interface ProductFiltersProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: Partial<MarketplaceFilters>) => void;
  onReset: () => void;
  activeFiltersCount: number;
}

export const ProductFilters = ({
  filters,
  onFiltersChange,
  onReset,
  activeFiltersCount
}: ProductFiltersProps) => {
  const { categories } = useCategories();
  const [openSections, setOpenSections] = useState({
    categories: true,
    countries: true,
    price: true,
    condition: true,
    tags: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = Array.isArray(filters.category) 
      ? filters.category 
      : filters.category 
        ? [filters.category] 
        : [];

    let newCategories;
    if (checked) {
      // Ajouter la catégorie si elle n'existe pas déjà
      newCategories = currentCategories.includes(category as any)
        ? currentCategories
        : [...currentCategories, category as any];
    } else {
      // Retirer la catégorie
      newCategories = currentCategories.filter(cat => cat !== category);
    }

    onFiltersChange({
      category: newCategories.length > 0 ? newCategories : undefined
    });
  };

  const handleCountriesChange = (countries: Country[]) => {
    onFiltersChange({
      country: countries.length === 1 ? countries[0] : undefined
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    onFiltersChange({
      condition: checked ? condition : undefined
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFiltersChange({
      tags: newTags.length > 0 ? newTags : undefined
    });
  };

  // State pour les tags dynamiques
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  // Fonction pour charger les tags
  const loadTags = useCallback(async (forceRefresh: boolean = false) => {
    setIsLoadingTags(true);
    try {
      const tags = forceRefresh 
        ? await refreshTags(15) 
        : await getPopularTags(15); // Récupérer les 15 tags les plus populaires
      if (tags.length > 0) {
        setPopularTags(tags);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tags:', error);
      // Garder les tags par défaut en cas d'erreur
    } finally {
      setIsLoadingTags(false);
    }
  }, []);

  // Charger les tags au montage du composant
  useEffect(() => {
    loadTags();
  }, [loadTags]);

  // Rafraîchissement automatique des tags toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      loadTags();
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [loadTags]);

  const conditionOptions = [
    { value: 'new', label: '✨ Neuf', description: 'Produit jamais utilisé' },
    { value: 'like_new', label: '🌟 Comme neuf', description: 'Excellent état, très peu utilisé' }, 
    { value: 'good', label: '👍 Bon état', description: 'Quelques signes d\'usage' },
    { value: 'fair', label: '⚠️ État correct', description: 'Signes d\'usage visibles' },
    { value: 'poor', label: '❌ Mauvais état', description: 'État dégradé, défauts visibles' },
    { value: 'to_repair', label: '🔧 À réparer', description: 'Nécessite des réparations' }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtres
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Categories */}
        <Collapsible
          open={openSections.categories}
          onOpenChange={() => toggleSection('categories')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
              Catégories
              {openSections.categories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={
                    Array.isArray(filters.category) 
                      ? filters.category.includes(category.value)
                      : filters.category === category.value
                  }
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={category.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.label}
                  </span>
                  {category.count && (
                    <span className="text-xs text-muted-foreground">
                      ({category.count})
                    </span>
                  )}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Prix */}
        <Collapsible
          open={openSections.price}
          onOpenChange={() => toggleSection('price')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
              Prix
              {openSections.price ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            {/* Champs de saisie prix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Prix minimum</label>
                <Input
                  type="number"
                  placeholder="0€"
                  value={filters.price_min || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    onFiltersChange({ price_min: value });
                  }}
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Prix maximum</label>
                <Input
                  type="number"
                  placeholder="∞"
                  value={filters.price_max || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    onFiltersChange({ price_max: value });
                  }}
                  className="h-9"
                />
              </div>
            </div>
            
            {/* Raccourcis de prix populaires */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Raccourcis populaires</label>
              <div className="flex flex-wrap gap-1">
                {[
                  { label: '< 50€', min: 0, max: 50 },
                  { label: '50-100€', min: 50, max: 100 },
                  { label: '100-250€', min: 100, max: 250 },
                  { label: '250-500€', min: 250, max: 500 },
                  { label: '500€+', min: 500, max: 5000 }
                ].map((range) => (
                  <Button
                    key={range.label}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      onFiltersChange({
                        price_min: range.min,
                        price_max: range.max === 5000 ? undefined : range.max
                      });
                    }}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Badges des filtres actifs */}
            {(filters.price_min !== undefined || filters.price_max !== undefined) && (
              <div className="flex gap-2 flex-wrap">
                {filters.price_min !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    Min: {filters.price_min}€
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onFiltersChange({ price_min: undefined })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.price_max !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    Max: {filters.price_max}€
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onFiltersChange({ price_max: undefined })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* État/Condition */}
        <Collapsible
          open={openSections.condition}
          onOpenChange={() => toggleSection('condition')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
              État
              {openSections.condition ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {conditionOptions.map((condition) => (
              <div key={condition.value} className="flex items-center space-x-2">
                <Checkbox
                  id={condition.value}
                  checked={filters.condition === condition.value}
                  onCheckedChange={(checked) =>
                    handleConditionChange(condition.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={condition.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  <div className="flex flex-col">
                    <span>{condition.label}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {condition.description}
                    </span>
                  </div>
                </label>
              </div>
            ))}
            
            {/* Badge de l'état sélectionné */}
            {filters.condition && (
              <div className="mt-3 pt-3 border-t">
                <Badge variant="secondary" className="text-xs">
                  État: {conditionOptions.find(c => c.value === filters.condition)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => onFiltersChange({ condition: undefined })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Tags populaires */}
        <Collapsible
          open={openSections.tags}
          onOpenChange={() => toggleSection('tags')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
              <div className="flex items-center gap-2">
                Tags populaires
                {isLoadingTags && (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadTags(true); // Force le rafraîchissement
                  }}
                  className="h-6 w-6 p-0"
                  disabled={isLoadingTags}
                  title="Actualiser les tags"
                >
                  <RefreshCw className={`h-3 w-3 ${isLoadingTags ? 'animate-spin' : ''}`} />
                </Button>
                {openSections.tags ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => {
                const isSelected = filters.tags?.includes(tag) || false;
                return (
                  <Badge
                    key={tag}
                    variant={isSelected ? "default" : "secondary"}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    {isSelected && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

      </CardContent>
    </Card>
  );
};