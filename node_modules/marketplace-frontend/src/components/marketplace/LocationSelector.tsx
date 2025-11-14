import { useState } from 'react';
import { MapPin, Search, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import type { Country } from '@/types/marketplace';

interface LocationSelectorProps {
  selectedLocation?: string;
  onLocationChange: (location: string | undefined, country?: Country) => void;
}

const POPULAR_CITIES = [
  { name: 'Paris', country: 'FR', flag: '🇫🇷' },
  { name: 'London', country: 'GB', flag: '🇬🇧' },
  { name: 'New York', country: 'US', flag: '🇺🇸' },
  { name: 'Toronto', country: 'CA', flag: '🇨🇦' },
  { name: 'Berlin', country: 'DE', flag: '🇩🇪' },
  { name: 'Tokyo', country: 'JP', flag: '🇯🇵' },
  { name: 'Sydney', country: 'AU', flag: '🇦🇺' },
  { name: 'Dubai', country: 'AE', flag: '🇦🇪' },
];

export const LocationSelector = ({ selectedLocation, onLocationChange }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = POPULAR_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (city: typeof POPULAR_CITIES[0]) => {
    onLocationChange(city.name, city.country as Country);
    setOpen(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // En production, vous utiliseriez une API de géocodage inverse
          onLocationChange('Ma position', 'FR');
          setOpen(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 min-w-[200px] justify-start border-marketplace-orange/20 hover:border-marketplace-orange/40"
        >
          <MapPin className="h-4 w-4 text-marketplace-orange" />
          <span className="truncate">
            {selectedLocation || 'Choisir une localisation'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <Button
            variant="outline"
            onClick={handleCurrentLocation}
            className="w-full justify-start gap-2 hover:bg-marketplace-blue/10"
          >
            <Locate className="h-4 w-4 text-marketplace-blue" />
            Utiliser ma position actuelle
          </Button>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Villes populaires</h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredCities.map((city) => (
                <Button
                  key={`${city.name}-${city.country}`}
                  variant="ghost"
                  onClick={() => handleLocationSelect(city)}
                  className="justify-start gap-2 h-auto p-2 hover:bg-marketplace-gray/50"
                >
                  <span className="text-lg">{city.flag}</span>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{city.name}</span>
                    <span className="text-xs text-muted-foreground">{city.country}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {selectedLocation && (
            <div className="border-t pt-3">
              <Button
                variant="ghost"
                onClick={() => {
                  onLocationChange(undefined);
                  setOpen(false);
                }}
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Supprimer la localisation
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};