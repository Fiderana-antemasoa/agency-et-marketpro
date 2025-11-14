import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Search, MapPin } from 'lucide-react';
import { getFreelancers } from '@/services/mockFreelanceService';
import type { User } from '@/types/freelance';
import { Link } from 'react-router-dom';

const FreelanceMarketplace = () => {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFreelancers = async () => {
      setLoading(true);
      const data = await getFreelancers();
      setFreelancers(data);
      setLoading(false);
    };
    loadFreelancers();
  }, []);

  const filteredFreelancers = freelancers.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.skills?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Trouvez le freelance parfait
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-8">
            Des milliers de freelances talentueux prêts à travailler sur vos projets
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par compétence, nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Design', 'Développement', 'Marketing', 'Rédaction', 'Vidéo'].map((cat) => (
              <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {filteredFreelancers.length} freelances disponibles
          </h2>
          <Link to="/become-freelance">
            <Button variant="outline">Devenir freelance</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={freelancer.photo}
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{freelancer.rating}</span>
                        <span className="text-muted-foreground text-sm">
                          ({freelancer.total_reviews} avis)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {freelancer.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {freelancer.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{freelancer.languages?.join(', ')}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Link to={`/freelancer/${freelancer.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Voir le profil
                    </Button>
                  </Link>
                  <Button className="flex-1">Contacter</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelanceMarketplace;
