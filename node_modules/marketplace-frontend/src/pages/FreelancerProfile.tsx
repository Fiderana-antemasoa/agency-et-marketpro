import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, MessageSquare, ShoppingCart, Award } from 'lucide-react';
import { getFreelancerById, getFreelanceServices, getDigitalProducts, mockReviews } from '@/services/mockFreelanceService';
import type { User, FreelanceService, DigitalProduct } from '@/types/freelance';

const FreelancerProfile = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState<User | null>(null);
  const [services, setServices] = useState<FreelanceService[]>([]);
  const [products, setProducts] = useState<DigitalProduct[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      const user = await getFreelancerById(id);
      setFreelancer(user);
      
      if (user) {
        const userServices = await getFreelanceServices(user.id);
        const userProducts = await getDigitalProducts(user.id);
        setServices(userServices);
        setProducts(userProducts);
      }
    };
    loadData();
  }, [id]);

  if (!freelancer) {
    return <div className="container mx-auto p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={freelancer.photo}
                alt={freelancer.name}
                className="w-32 h-32 rounded-full"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold">{freelancer.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{freelancer.rating}</span>
                        <span className="text-muted-foreground">
                          ({freelancer.total_reviews} avis)
                        </span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {freelancer.total_sales} ventes
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{freelancer.bio}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{freelancer.languages?.join(', ')}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {freelancer.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
            <TabsTrigger value="products">Produits ({products.length})</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({mockReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{service.price.toLocaleString()} FCFA</p>
                        <p className="text-sm text-muted-foreground">
                          Livraison en {service.delivery_days} jours
                        </p>
                      </div>
                      <Link to={`/service/${service.id}`}>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Commander
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={product.preview_images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">{product.price.toLocaleString()} FCFA</p>
                      <Button size="sm">Acheter</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {product.downloads} téléchargements
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FreelancerProfile;
