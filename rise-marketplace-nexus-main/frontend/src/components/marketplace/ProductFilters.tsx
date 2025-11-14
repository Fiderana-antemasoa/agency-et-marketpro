import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { CountryFilter } from './CountryFilter';
import type { MarketplaceFilters, CategoryOption, Country } from '@/types/marketplace';
import { useCategories } from '@/hooks/useMarketplace';

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
    condition: false,
    tags: false,
    featured: true
  });

  const [priceRange, setPriceRange] = useState([
    filters.price_min || 0,
    filters.price_max || 5000
  ]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      category: checked ? category as any : undefined
    });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handlePriceCommit = (values: number[]) => {
    onFiltersChange({
      price_min: values[0] > 0 ? values[0] : undefined,
      price_max: values[1] < 5000 ? values[1] : undefined
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

  const handleFeaturedChange = (checked: boolean) => {
    onFiltersChange({
      is_featured: checked || undefined
    });
  };

  const popularTags = [
    'design', 'react', 'typescript', 'figma', 'ui-kit', 
    'formation', 'marketing', 'seo', 'consultation', 'développement',
    'apple', 'samsung', 'neuf', 'occasion', 'garantie', 'livraison'
  ];

  const conditionOptions = [
    { value: 'new', label: 'Neuf' },
    { value: 'like_new', label: 'Comme neuf' }, 
    { value: 'good', label: 'Bon état' },
    { value: 'fair', label: 'État correct' },
    { value: 'poor', label: 'À réparer' }
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
                  checked={filters.category === category.value}
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

        {/* Pays */}
        <CountryFilter
          selectedCountries={filters.country ? [filters.country] : []}
          onCountriesChange={handleCountriesChange}
        />

        <Separator />

        {/* Price Range */}
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
            <div className="px-3">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                onValueCommit={handlePriceCommit}
                max={5000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>
            {(filters.price_min !== undefined || filters.price_max !== undefined) && (
              <div className="flex gap-2">
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
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {condition.label}
                </label>
              </div>
            ))}
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
              Tags populaires
              {openSections.tags ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
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

        <Separator />

        {/* Options spéciales */}
        <Collapsible
          open={openSections.featured}
          onOpenChange={() => toggleSection('featured')}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
              Options
              {openSections.featured ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={filters.is_featured || false}
                onCheckedChange={handleFeaturedChange}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                ⭐ Produits mis en avant uniquement
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trending"
                checked={filters.is_trending || false}
                onCheckedChange={(checked) => onFiltersChange({ is_trending: (checked as boolean) || undefined })}
              />
              <label
                htmlFor="trending"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                🔥 Produits tendance uniquement
              </label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};