import { useState } from 'react';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Country, CountryOption } from '@/types/marketplace';

interface CountryFilterProps {
  selectedCountries: Country[];
  onCountriesChange: (countries: Country[]) => void;
}

const countryOptions: CountryOption[] = [
  { value: 'FR', label: 'France', flag: '🇫🇷', count: 245 },
  { value: 'US', label: 'États-Unis', flag: '🇺🇸', count: 189 },
  { value: 'GB', label: 'Royaume-Uni', flag: '🇬🇧', count: 156 },
  { value: 'DE', label: 'Allemagne', flag: '🇩🇪', count: 134 },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', count: 98 },
  { value: 'IT', label: 'Italie', flag: '🇮🇹', count: 87 },
  { value: 'ES', label: 'Espagne', flag: '🇪🇸', count: 76 },
  { value: 'CH', label: 'Suisse', flag: '🇨🇭', count: 65 },
  { value: 'BE', label: 'Belgique', flag: '🇧🇪', count: 54 },
  { value: 'NL', label: 'Pays-Bas', flag: '🇳🇱', count: 43 },
  { value: 'AU', label: 'Australie', flag: '🇦🇺', count: 32 },
  { value: 'JP', label: 'Japon', flag: '🇯🇵', count: 28 },
  { value: 'BR', label: 'Brésil', flag: '🇧🇷', count: 21 },
  { value: 'IN', label: 'Inde', flag: '🇮🇳', count: 18 },
  { value: 'OTHER', label: 'Autres pays', flag: '🌍', count: 156 }
];

export const CountryFilter = ({ selectedCountries, onCountriesChange }: CountryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCountryToggle = (country: Country) => {
    if (selectedCountries.includes(country)) {
      onCountriesChange(selectedCountries.filter(c => c !== country));
    } else {
      onCountriesChange([...selectedCountries, country]);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 font-semibold">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Pays
            {selectedCountries.length > 0 && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {selectedCountries.length}
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-3 max-h-64 overflow-y-auto">
        {countryOptions.map((country) => (
          <div key={country.value} className="flex items-center space-x-2">
            <Checkbox
              id={country.value}
              checked={selectedCountries.includes(country.value)}
              onCheckedChange={() => handleCountryToggle(country.value)}
            />
            <label
              htmlFor={country.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                {country.label}
              </span>
              {country.count && (
                <span className="text-xs text-muted-foreground">
                  ({country.count})
                </span>
              )}
            </label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};