import { useMemo, useState } from 'react';
import { MapPin, Search, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import type { Country } from '@/types/marketplace';

export type LocationOption = {
  name: string;
  country?: Country;
  flag?: string;
  count?: number;
};

interface LocationSelectorProps {
  selectedLocation?: string;
  locations?: LocationOption[];
  onLocationChange: (location: string | undefined, country?: Country) => void;
}

const POPULAR_CITIES: LocationOption[] = [
  { name: 'Paris', country: 'FR', flag: '🇫🇷' },
  { name: 'London', country: 'GB', flag: '🇬🇧' },
  { name: 'New York', country: 'US', flag: '🇺🇸' },
  { name: 'Toronto', country: 'CA', flag: '🇨🇦' },
  { name: 'Berlin', country: 'DE', flag: '🇩🇪' },
  { name: 'Tokyo', country: 'JP', flag: '🇯🇵' },
  { name: 'Sydney', country: 'AU', flag: '🇦🇺' },
  { name: 'Dubai', country: 'AE', flag: '🇦🇪' },
];

const getFlagFromCountry = (country?: Country) => {
  if (!country) return '🌍';
  if (country === 'OTHER') return '🌍';
  return country
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

export const LocationSelector = ({ selectedLocation, locations, onLocationChange }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const availableLocations = useMemo(() => {
    if (locations && locations.length > 0) {
      return locations;
    }
    return POPULAR_CITIES;
  }, [locations]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredLocations = availableLocations.filter(option => {
    if (!normalizedQuery) return true;
    return (
      option.name.toLowerCase().includes(normalizedQuery) ||
      (option.country?.toLowerCase().includes(normalizedQuery) ?? false)
    );
  });

  const handleLocationSelect = (option: LocationOption) => {
    onLocationChange(option.name, option.country);
    setOpen(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
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
              placeholder="Rechercher une localisation..."
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
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Localisations disponibles</h4>
              {locations && locations.length > 0 && (
                <Badge variant="outline">{locations.length}</Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredLocations.length === 0 ? (
                <p className="col-span-2 text-xs text-muted-foreground text-center py-4">
                  Aucune localisation
                </p>
              ) : (
                filteredLocations.map((option) => (
                  <Button
                    key={`${option.name}-${option.country ?? 'NA'}`}
                    variant="ghost"
                    onClick={() => handleLocationSelect(option)}
                    className="justify-start gap-2 h-auto p-2 hover:bg-marketplace-gray/50"
                  >
                    <span className="text-lg">
                      {option.flag || getFlagFromCountry(option.country)}
                    </span>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium">{option.name}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {option.country && <span>{option.country}</span>}
                        {option.count && (
                          <>
                            <span>•</span>
                            <span>{option.count} offre{option.count > 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Button>
                ))
              )}
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
