import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, User, MapPin, Calendar, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { fetchProductDetails, fetchMarketplaceProducts } from '@/services/marketplaceService';
import type { MarketplaceProduct } from '@/types/marketplace';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<MarketplaceProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await fetchProductDetails(parseInt(id));
        setProduct(productData);

        // Charger produits similaires
        if (productData) {
          const related = await fetchMarketplaceProducts(
            { category: productData.category, per_page: 4 },
            1,
            4
          );
          setRelatedProducts(related.data.filter(p => p.id !== productData.id));
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link to="/marketplace">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la marketplace
          </Button>
        </Link>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link to="/marketplace" className="hover:text-foreground">
          Marketplace
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      {/* Bouton retour */}
      <Link to="/marketplace" className="inline-flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Retour à la marketplace
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images et infos principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image principale */}
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={product.featured_image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Titre et actions */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.stats?.average_rating || 0)}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.stats?.total_reviews || 0} avis)
                  </span>
                </div>
                <Badge variant={product.condition === 'new' ? 'default' : 'secondary'}>
                  {product.condition === 'new' ? 'Neuf' : 
                   product.condition === 'like_new' ? 'Comme neuf' :
                   product.condition === 'good' ? 'Bon état' :
                   product.condition === 'fair' ? 'État correct' : 'À réparer'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Prix et achat */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {product.price.toFixed(2)} {product.currency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.price_type === 'fixed' ? 'Prix fixe' : 
                     product.price_type === 'subscription' ? 'Abonnement' :
                     product.price_type === 'quote' ? 'Sur devis' : 'Gratuit'}
                  </div>
                </div>
                <div className="text-right">
                  {product.delivery_time && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      {product.delivery_time}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button size="lg" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Acheter maintenant
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Contacter le vendeur
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              {product.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Caractéristiques principales</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                    {product.tags.length > 3 && (
                      <Badge variant="outline" className="bg-muted">
                        +{product.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar vendeur et infos */}
        <div className="space-y-6">
          {/* Vendeur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Vendeur
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.user && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={product.user.avatar} />
                      <AvatarFallback>
                        {product.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{product.user.name}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {renderStars(product.user.seller_rating || 0)}
                        <span className="ml-1">
                          ({product.user.seller_rating?.toFixed(1) || 0})
                        </span>
                      </div>
                    </div>
                    {product.user.is_verified && (
                      <Shield className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Produits en vente</span>
                      <span>{product.user.total_products}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{product.city || 'Non spécifié'}, {product.country}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Voir le profil
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Infos produit */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Catégorie</span>
                <span className="capitalize">{product.category}</span>
              </div>
              {product.brand && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Marque</span>
                  <span>{product.brand}</span>
                </div>
              )}
              {product.model && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Modèle</span>
                  <span>{product.model}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">État</span>
                <span className="capitalize">
                  {product.condition === 'new' ? 'Neuf' : 
                   product.condition === 'like_new' ? 'Comme neuf' :
                   product.condition === 'good' ? 'Bon état' :
                   product.condition === 'fair' ? 'État correct' : 'À réparer'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Publié le</span>
                <span>{new Date(product.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vues</span>
                <span>{product.stats?.views_count || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Produits similaires */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onProductClick={(id) => window.location.href = `/marketplace/product/${id}`}
                onFavoriteClick={(id, isFav) => console.log('Toggle favorite', id, isFav)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}