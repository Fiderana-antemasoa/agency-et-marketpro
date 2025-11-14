// Types pour la marketplace complète - Compatible avec votre structure Laravel/MySQL
export type ProductCategory = 
  | 'electronics' | 'computers' | 'phones' | 'cameras' | 'audio'
  | 'fashion' | 'clothing' | 'shoes' | 'accessories' | 'jewelry'
  | 'home' | 'furniture' | 'decor' | 'kitchen' | 'garden'
  | 'books' | 'education' | 'courses' | 'ebooks' | 'audiobooks'
  | 'health' | 'beauty' | 'fitness' | 'supplements' | 'medical'
  | 'sports' | 'outdoor' | 'cycling' | 'football' | 'basketball'
  | 'automotive' | 'parts' | 'tools' | 'motorcycles' | 'boats'
  | 'services' | 'consulting' | 'design' | 'marketing' | 'development'
  | 'digital_products' | 'software' | 'apps' | 'templates' | 'themes'
  | 'arts' | 'music' | 'photography' | 'crafts' | 'collectibles'
  | 'real_estate' | 'apartments' | 'houses' | 'commercial' | 'land'
  | 'business' | 'equipment' | 'supplies' | 'franchises' | 'investments'
  | 'travel' | 'tickets' | 'hotels' | 'tours' | 'experiences'
  | 'food' | 'restaurants' | 'catering' | 'groceries' | 'beverages'
  | 'other';

export type Currency = 'EUR' | 'USD' | 'GBP' | 'CAD' | 'CHF' | 'JPY' | 'CNY' | 'INR' | 'BRL' | 'MXN' | 'ZAR' | 'AUD' | 'NZD' | 'SGD' | 'HKD';

export type Country = 
  | 'FR' | 'US' | 'GB' | 'DE' | 'ES' | 'IT' | 'CA' | 'AU' | 'NZ' | 'JP' | 'CN' | 'IN' | 'BR' | 'MX' | 'ZA' | 'SG' | 'HK' | 'CH' | 'NL' | 'BE' | 'AT' | 'SE' | 'NO' | 'DK' | 'FI' | 'PT' | 'IE' | 'LU' | 'GR' | 'CY' | 'MT' | 'IS' | 'LI' | 'AD' | 'MC' | 'SM' | 'VA' | 'RU' | 'UA' | 'PL' | 'CZ' | 'SK' | 'HU' | 'RO' | 'BG' | 'HR' | 'SI' | 'EE' | 'LV' | 'LT' | 'MA' | 'TN' | 'DZ' | 'EG' | 'SA' | 'AE' | 'QA' | 'KW' | 'BH' | 'OM' | 'JO' | 'LB' | 'SY' | 'IQ' | 'IR' | 'AF' | 'PK' | 'BD' | 'LK' | 'NP' | 'BT' | 'MM' | 'TH' | 'KH' | 'LA' | 'VN' | 'MY' | 'ID' | 'PH' | 'KR' | 'KP' | 'MN' | 'KZ' | 'UZ' | 'TM' | 'KG' | 'TJ' | 'GE' | 'AM' | 'AZ' | 'TR' | 'CY' | 'IL' | 'PS' | 'OTHER';

export type ProductStatus = 'draft' | 'active' | 'inactive' | 'pending' | 'rejected';

export type PriceType = 'fixed' | 'subscription' | 'quote' | 'free';

export type SortOption = 'created_at' | 'price' | 'rating' | 'sales' | 'trending';

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  is_primary: boolean;
}

export interface ProductReview {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}

export interface ProductStats {
  total_reviews: number;
  average_rating: number;
  total_sales: number;
  views_count: number;
}

export interface MarketplaceUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  is_verified: boolean;
  seller_rating?: number;
  total_products?: number;
}

export interface MarketplaceProduct {
  id: number;
  user_id: number;
  title: string;
  description: string;
  short_description?: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  currency: Currency;
  price_type: PriceType;
  featured_image: string;
  images: ProductImage[];
  tags: string[];
  features: string[];
  specifications: Record<string, any>;
  delivery_time?: string;
  slug: string;
  status: ProductStatus;
  is_featured: boolean;
  is_trending: boolean;
  country: Country;
  city?: string;
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  brand?: string;
  model?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  user?: MarketplaceUser;
  reviews?: ProductReview[];
  stats?: ProductStats;
}

export interface MarketplaceFilters {
  search?: string;
  category?: ProductCategory;
  subcategory?: string;
  country?: Country;
  city?: string;
  price_min?: number;
  price_max?: number;
  condition?: string;
  brand?: string;
  sort_by?: SortOption;
  tags?: string[];
  is_featured?: boolean;
  is_trending?: boolean;
  page?: number;
  per_page?: number;
}

export interface MarketplaceListResponse {
  data: MarketplaceProduct[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface CategoryOption {
  value: ProductCategory;
  label: string;
  icon: string;
  count?: number;
  subcategories?: { value: string; label: string; count?: number }[];
}

export interface CountryOption {
  value: Country;
  label: string;
  flag: string;
  count?: number;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'tag';
  url?: string;
}