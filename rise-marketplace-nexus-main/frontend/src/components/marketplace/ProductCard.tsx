import { useState } from 'react';
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { MarketplaceProduct } from '@/types/marketplace';
import { formatPrice } from '@/services/marketplaceService';

interface ProductCardProps {
  product: MarketplaceProduct;
  onFavoriteClick?: (productId: number, isFavorite: boolean) => void;
  onProductClick?: (productId: number) => void;
  isFavorite?: boolean;
}

export const ProductCard = ({ 
  product, 
  onFavoriteClick, 
  onProductClick,
  isFavorite = false 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onFavoriteClick) return;
    
    setFavoriteLoading(true);
    try {
      await onFavoriteClick(product.id, isFavorite);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleCardClick = () => {
    onProductClick?.(product.id);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      design: 'bg-purple-100 text-purple-800',
      course: 'bg-blue-100 text-blue-800',
      consulting: 'bg-green-100 text-green-800',
      software: 'bg-orange-100 text-orange-800',
      service: 'bg-cyan-100 text-cyan-800',
      digital_product: 'bg-pink-100 text-pink-800',
      marketing: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const formatDeliveryDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg aspect-[4/3] bg-gray-100">
        {product.featured_image ? (
          <img
            src={product.featured_image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100">
                  <div class="text-center text-gray-400">
                    <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-sm">Pas d'image</p>
                  </div>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Pas d'image</p>
            </div>
          </div>
        )}
        
        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.is_featured && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              ⭐ Featured
            </Badge>
          )}
          {product.is_trending && (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              🔥 Trending
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white"
          onClick={handleFavoriteClick}
          disabled={favoriteLoading}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-2" />
              Voir le détail
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <Badge 
          variant="secondary" 
          className={`text-xs mb-2 ${getCategoryColor(product.category)}`}
        >
          {product.category.replace('_', ' ')}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.short_description || product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {product.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{product.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Rating & Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {product.stats && (
            <>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.stats.average_rating}</span>
                <span>({product.stats.total_reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4" />
                <span>{product.stats.total_sales} ventes</span>
              </div>
            </>
          )}
        </div>

        {/* Seller Info */}
        {product.user && (
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.user.avatar} />
              <AvatarFallback className="text-xs">
                {product.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {product.user.name}
            </span>
            {product.user.is_verified && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                ✓
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.price_type !== 'fixed' && (
            <span className="text-xs text-muted-foreground">
              {product.price_type === 'subscription' ? '/mois' : 'sur devis'}
            </span>
          )}
        </div>

        {/* Delivery Time */}
        {product.delivery_time && (
          <div className="text-right max-w-[120px]">
            <span className="text-xs text-muted-foreground block">Livraison</span>
            <div className="text-sm font-medium truncate">{formatDeliveryDate(product.delivery_time)}</div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};