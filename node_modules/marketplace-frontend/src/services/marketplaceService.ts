// Service Marketplace - Structure prête pour votre API Laravel
import type { 
  MarketplaceProduct, 
  MarketplaceFilters, 
  MarketplaceListResponse,
  CategoryOption,
  SearchSuggestion,
  ProductReview,
  Country 
} from '@/types/marketplace';

// ========== DONNÉES MOCKÉES (À remplacer par vos vraies API) ==========
const MOCK_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 1,
    user_id: 1,
    title: "Design System Complet UI/UX",
    description: "Un design system complet avec plus de 200 composants, guides de style et ressources pour créer des interfaces modernes et cohérentes.",
    short_description: "Design system professionnel avec 200+ composants",
    category: "design",
    subcategory: "ui-kit",
    price: 299.00,
    currency: "EUR",
    price_type: "fixed",
    featured_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
    images: [
      { id: 1, url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500", alt: "Design System", is_primary: true }
    ],
    tags: ["design", "ui-kit", "figma", "components"],
    features: ["200+ composants", "Guide de style", "Fichiers Figma", "Documentation"],
    specifications: {
      format: "Figma + Sketch",
      compatibility: "Web & Mobile",
      updates: "6 mois gratuit"
    },
    delivery_time: "Immédiat",
    slug: "design-system-complet-ui-ux",
    status: "active",
    is_featured: true,
    is_trending: true,
    country: "FR",
    city: "Paris",
    condition: "new",
    brand: "DesignCorp",
    published_at: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    user: {
      id: 1,
      name: "Marie Designer",
      email: "marie@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100",
      is_verified: true,
      seller_rating: 4.8,
      total_products: 12
    },
    stats: {
      total_reviews: 45,
      average_rating: 4.8,
      total_sales: 156,
      views_count: 1234
    }
  },
  {
    id: 2,
    user_id: 2,
    title: "Formation React TypeScript Avancée",
    description: "Formation complète pour maîtriser React avec TypeScript, incluant les hooks avancés, patterns modernes et bonnes pratiques.",
    short_description: "Formation React TypeScript complète",
    category: "courses",
    subcategory: "programming",
    price: 199.00,
    currency: "EUR",
    price_type: "fixed",
    featured_image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500",
    images: [
      { id: 2, url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500", alt: "Formation React", is_primary: true }
    ],
    tags: ["react", "typescript", "formation", "développement"],
    features: ["15h de vidéo", "Projets pratiques", "Support Discord", "Certificat"],
    specifications: {
      duration: "15 heures",
      level: "Intermédiaire/Avancé",
      support: "Discord + Email"
    },
    delivery_time: "Accès immédiat",
    slug: "formation-react-typescript-avancee",
    status: "active",
    is_featured: false,
    is_trending: true,
    country: "CA",
    city: "Montreal",
    condition: "good",
    published_at: "2024-01-10T14:30:00Z",
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z",
    user: {
      id: 2,
      name: "Thomas Dev",
      email: "thomas@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      is_verified: true,
      seller_rating: 4.9,
      total_products: 8
    },
    stats: {
      total_reviews: 67,
      average_rating: 4.9,
      total_sales: 203,
      views_count: 2456
    }
  },
  {
    id: 3,
    user_id: 3,
    title: "Consultation Marketing Digital",
    description: "Consultation personnalisée pour optimiser votre stratégie marketing digital et augmenter votre visibilité en ligne.",
    short_description: "Consultation marketing digital personnalisée",
    category: "consulting",
    subcategory: "marketing",
    price: 150.00,
    currency: "EUR",
    price_type: "fixed",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
    images: [
      { id: 3, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500", alt: "Marketing Digital", is_primary: true }
    ],
    tags: ["marketing", "seo", "social-media", "consultation"],
    features: ["Audit complet", "Stratégie personnalisée", "Plan d'action", "Suivi 30j"],
    specifications: {
      duration: "2 heures",
      format: "Visioconférence",
      deliverable: "Rapport détaillé"
    },
    delivery_time: "Sous 48h",
    slug: "consultation-marketing-digital",
    status: "active",
    is_featured: true,
    is_trending: false,
    country: "BE",
    city: "Brussels",
    condition: "poor",
    published_at: "2024-01-12T09:15:00Z",
    created_at: "2024-01-12T09:15:00Z",
    updated_at: "2024-01-12T09:15:00Z",
    user: {
      id: 3,
      name: "Sophie Marketing",
      email: "sophie@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      is_verified: true,
      seller_rating: 4.7,
      total_products: 15
    },
    stats: {
      total_reviews: 89,
      average_rating: 4.7,
      total_sales: 127,
      views_count: 876
    }
  }
];

const MOCK_CATEGORIES: CategoryOption[] = [
  // Catégories principales d'agency-connect (synchronisées)
  { value: 'web', label: 'Développement Web', icon: '🌐', count: 45 },
  { value: 'seo', label: 'SEO & Référencement', icon: '🔍', count: 32 },
  { value: 'marketing', label: 'Marketing Digital', icon: '📈', count: 38 },
  { value: 'design', label: 'Design & Graphisme', icon: '🎨', count: 67 },
  { value: 'consulting', label: 'Consulting & Conseil', icon: '💡', count: 41 },
  
  // Catégories supplémentaires marketplace
  { value: 'courses', label: 'Formations & Cours', icon: '🎓', count: 28 },
  { value: 'software', label: 'Logiciels & Outils', icon: '⚡', count: 23 },
  { value: 'digital_products', label: 'Produits Numériques', icon: '💻', count: 34 },
  { value: 'services', label: 'Services Divers', icon: '🛠️', count: 29 },
  { value: 'electronics', label: 'Électronique', icon: '📱', count: 89 },
  { value: 'fashion', label: 'Mode & Style', icon: '👗', count: 54 },
  { value: 'home', label: 'Maison & Jardin', icon: '🏠', count: 76 },
  { value: 'automotive', label: 'Automobile', icon: '🚗', count: 21 },
  { value: 'sports', label: 'Sports & Loisirs', icon: '⚽', count: 18 },
  { value: 'health', label: 'Santé & Bien-être', icon: '💊', count: 15 },
  { value: 'other', label: 'Autres Catégories', icon: '📦', count: 12 }
];

// ========== FONCTIONS API (Structure Laravel-ready) ==========

/**
 * Récupère la liste des produits avec filtres - GET /api/marketplace/products
 */
export const fetchMarketplaceProducts = async (
  filters: MarketplaceFilters = {},
  page: number = 1,
  perPage: number = 12
): Promise<MarketplaceListResponse> => {
  // Try to fetch offers from Agency Backend and map to marketplace products
  try {
    const agencyUrl = `${getAgencyApiBase()}/offers`;
    console.info('[Marketplace] Fetching offers from agency backend:', agencyUrl);
    const res = await fetch(agencyUrl, { headers: { 'Accept': 'application/json' } });
    console.info('[Marketplace] Agency offers response status:', res.status);
    if (!res.ok) throw new Error('Agency backend returned ' + res.status);

    const offers = await res.json();
    const allProducts: MarketplaceProduct[] = Array.isArray(offers)
      ? offers.map(mapOfferToProduct)
      : [];

    // Apply all filters client-side
    let filteredProducts = [...allProducts];
    
    // Search filter
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    
    // Category filter
    if (filters.category) {
      if (Array.isArray(filters.category)) {
        filteredProducts = filteredProducts.filter(p => 
          filters.category!.includes(p.category)
        );
      } else {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
    }
    
    // Brand filter
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        (p.brand || '').toLowerCase() === String(filters.brand).toLowerCase()
      );
    }
    
    // Price filters
    if (filters.price_min !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.price_min!);
    }
    if (filters.price_max !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.price_max!);
    }
    
    // Condition filter
    if (filters.condition) {
      filteredProducts = filteredProducts.filter(p => p.condition === filters.condition);
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }
    
    // Featured filter
    if (filters.is_featured) {
      filteredProducts = filteredProducts.filter(p => p.is_featured);
    }
    
    // Trending filter
    if (filters.is_trending) {
      filteredProducts = filteredProducts.filter(p => p.is_trending);
    }
    
    // City filter
    if (filters.city) {
      filteredProducts = filteredProducts.filter(p => 
        (p.city || '').toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    
    // Sorting
    if (filters.sort_by) {
      switch (filters.sort_by) {
        case 'price':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => (b.stats?.average_rating || 0) - (a.stats?.average_rating || 0));
          break;
        case 'sales':
          filteredProducts.sort((a, b) => (b.stats?.total_sales || 0) - (a.stats?.total_sales || 0));
          break;
        case 'trending':
          filteredProducts.sort((a, b) => {
            if (a.is_trending && !b.is_trending) return -1;
            if (!a.is_trending && b.is_trending) return 1;
            return 0;
          });
          break;
        case 'created_at':
        default:
          filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
      }
    }

    const total = filteredProducts.length;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      current_page: page,
      last_page: Math.max(1, Math.ceil(total / perPage)),
      per_page: perPage,
      total: total,
      from: total === 0 ? 0 : startIndex + 1,
      to: Math.min(endIndex, total)
    };
  } catch (err) {
    console.warn('[Marketplace] Agency backend unreachable, falling back to MOCK_PRODUCTS:', err);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Apply same filters to MOCK_PRODUCTS
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Search filter
    if (filters.search) {
      const q = String(filters.search).toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    
    // Category filter
    if (filters.category) {
      if (Array.isArray(filters.category)) {
        filteredProducts = filteredProducts.filter(p => 
          filters.category!.includes(p.category)
        );
      } else {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
    }
    
    // Brand filter
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        (p.brand || '').toLowerCase() === String(filters.brand).toLowerCase()
      );
    }
    
    // Price filters
    if (filters.price_min !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.price_min!);
    }
    if (filters.price_max !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.price_max!);
    }
    
    // Condition filter
    if (filters.condition) {
      filteredProducts = filteredProducts.filter(p => p.condition === filters.condition);
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }
    
    // Featured filter
    if (filters.is_featured) {
      filteredProducts = filteredProducts.filter(p => p.is_featured);
    }
    
    // Trending filter
    if (filters.is_trending) {
      filteredProducts = filteredProducts.filter(p => p.is_trending);
    }
    
    // City filter
    if (filters.city) {
      filteredProducts = filteredProducts.filter(p => 
        (p.city || '').toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    
    // Sorting
    if (filters.sort_by) {
      switch (filters.sort_by) {
        case 'price':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => (b.stats?.average_rating || 0) - (a.stats?.average_rating || 0));
          break;
        case 'sales':
          filteredProducts.sort((a, b) => (b.stats?.total_sales || 0) - (a.stats?.total_sales || 0));
          break;
        case 'trending':
          filteredProducts.sort((a, b) => {
            if (a.is_trending && !b.is_trending) return -1;
            if (!a.is_trending && b.is_trending) return 1;
            return 0;
          });
          break;
        case 'created_at':
        default:
          filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
      }
    }
    
    const total = filteredProducts.length;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      current_page: page,
      last_page: Math.ceil(total / perPage),
      per_page: perPage,
      total: total,
      from: total === 0 ? 0 : startIndex + 1,
      to: Math.min(endIndex, total)
    };
  }
};

/**
 * Récupère les détails d'un produit - GET /api/marketplace/products/{id}
 */
export const fetchProductDetails = async (productId: number): Promise<MarketplaceProduct | null> => {
  // Fetch a single offer from Agency Backend and map it
  try {
    const url = `${getAgencyApiBase()}/offers/${productId}`;
    console.info('[Marketplace] Fetching product details (agency) from:', url);
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
    console.info('[Marketplace] Agency product details response status:', res.status);
    if (!res.ok) throw new Error('Agency backend error ' + res.status);
    const offer = await res.json();
    return mapOfferToProduct(offer);
  } catch (err) {
    console.warn('[Marketplace] Agency product details unreachable, using mock:', err);
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return null;
    return product;
  }
};

/**
 * Récupère les catégories - GET /api/marketplace/categories
 */
export const fetchCategories = async (): Promise<CategoryOption[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return [...MOCK_CATEGORIES];
};

/**
 * Recherche avec autocomplétion - GET /api/marketplace/search
 */
export const searchProducts = async (
  query: string,
  filters: Partial<MarketplaceFilters> = {}
): Promise<SearchSuggestion[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  if (!query.trim()) return [];

  const suggestions: SearchSuggestion[] = [];
  const queryLower = query.toLowerCase();

  // Suggestions de produits
  MOCK_PRODUCTS
    .filter(p => p.title.toLowerCase().includes(queryLower))
    .slice(0, 3)
    .forEach(product => {
      suggestions.push({
        id: `product-${product.id}`,
        text: product.title,
        type: 'product',
        url: `/marketplace/product/${product.id}`
      });
    });

  // Suggestions de catégories
  MOCK_CATEGORIES
    .filter(c => c.label.toLowerCase().includes(queryLower))
    .slice(0, 2)
    .forEach(category => {
      suggestions.push({
        id: `category-${category.value}`,
        text: category.label,
        type: 'category',
        url: `/marketplace?category=${category.value}`
      });
    });

  return suggestions;
};

/**
 * Soumet un avis - POST /api/marketplace/products/{id}/reviews
 */
export const submitProductReview = async (
  productId: number,
  reviewData: { rating: number; comment: string }
): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validation basique
  if (reviewData.rating < 1 || reviewData.rating > 5) {
    return { success: false, message: "La note doit être entre 1 et 5" };
  }
  
  if (!reviewData.comment.trim()) {
    return { success: false, message: "Le commentaire est requis" };
  }

  // Simulation succès
  return { success: true, message: "Avis soumis avec succès" };
};

/**
 * Toggle favori - POST /api/marketplace/products/{id}/favorite
 */
export const toggleProductFavorite = async (
  productId: number,
  isFavorite: boolean
): Promise<{ success: boolean; is_favorite: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { 
    success: true, 
    is_favorite: !isFavorite 
  };
};

// ========== UTILITAIRES ==========

/**
 * Génère l'URL de l'API - À adapter selon votre configuration Laravel
 */
export const getApiUrl = (endpoint: string): string => {
  // Prefer Vite env vars first if available
  try {
    const viteEnv = (import.meta as any)?.env;
    const viteBase = viteEnv?.VITE_API_URL;
    if (viteBase) return `${viteBase}/marketplace${endpoint}`;
  } catch {}
  const baseUrl = (typeof process !== 'undefined' && (process as any)?.env?.REACT_APP_API_URL)
    ? (process as any).env.REACT_APP_API_URL
    : 'http://127.0.0.1:4000/api';
  return `${baseUrl}/marketplace${endpoint}`;
};

// Agency API base (offers live on Agency backend)
const getAgencyApiBase = (): string => {
  // Prefer Vite env vars (VITE_...) when running with Vite, then REACT_APP_ fallback, then localhost
  try {
    const viteEnv = (import.meta as any)?.env;
    const viteUrl = viteEnv?.VITE_AGENCY_API_URL || viteEnv?.VITE_API_URL;
    if (viteUrl) return viteUrl;
  } catch (e) {
    // ignore if import.meta isn't available in the current environment
  }
  if (typeof process !== 'undefined') {
    const env: any = (process as any).env || {};
    return env.REACT_APP_AGENCY_API_URL || env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
  }
  return 'http://127.0.0.1:8000/api';
};

// Try to infer a brand name from a title when brand is not provided
const deriveBrandFromTitle = (title: string): string | undefined => {
  if (!title) return undefined;
  const commonBrands = [
    'Apple','Samsung','Google','Microsoft','Sony','Dell','HP','Lenovo','Asus','Acer',
    'Canon','Nikon','Adobe','Figma','Meta','Amazon','Oracle','IBM','Tesla','BMW','Mercedes',
    'DesignCorp','MarketingPro','ConsultingPlus'
  ];
  const words = title.split(/\s|[-–—]|\||\//).filter(Boolean);
  const found = words.find(w => commonBrands.includes(w.replace(/[^\w]/g, '')));
  if (found) return found;
  // Fallback: first capitalized word as a naive brand indicator
  const cap = words.find(w => /^[A-Z][A-Za-z0-9]+$/.test(w));
  return cap || undefined;
};

const mapOfferToProduct = (offer: any): MarketplaceProduct => {
  const id = offer.id;
  const title = offer.title || 'Untitled offer';
  const description = offer.description || '';
  const short_description = description.slice(0, 120);
  const category = (offer.category || 'services') as any;
  const price = typeof offer.price === 'number' ? offer.price : Number(offer.price || 0);
  const created_at = offer.created_at || new Date().toISOString();
  const updated_at = offer.updated_at || created_at;
  const inferredBrand = offer.brand || (offer.tags?.[0]) || deriveBrandFromTitle(title);
  const featuredImage = offer.avatar || offer.featured_image || offer.image || '';
  const { city, country } = mapOfferLocation(offer);
  const images = Array.isArray(offer.images) && offer.images.length > 0
    ? offer.images
    : (featuredImage ? [{ id: 1, url: featuredImage, alt: title, is_primary: true }] : []);

  return {
    id,
    user_id: offer.user_id || 0,
    title,
    description,
    short_description,
    category,
    subcategory: undefined,
    price,
    currency: offer.currency || 'EUR',
    price_type: 'fixed',
    featured_image: featuredImage,
    images,
    tags: offer.tags || [],
    features: offer.features || [],
    specifications: offer.specifications || {},
    delivery_time: offer.delivery_date || offer.validUntil || undefined,
    slug: offer.slug || String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    status: (offer.status as any) || 'active',
    is_featured: !!offer.is_featured,
    is_trending: !!offer.is_trending,
    country: (country || offer.country || 'OTHER') as Country,
    city: city || offer.city,
    condition: offer.condition_state,
    brand: inferredBrand,
    model: offer.model,
    published_at: offer.published_at,
    created_at,
    updated_at,
    user: offer.user ? {
      id: offer.user.id,
      name: offer.user.name,
      email: offer.user.email || '',
      avatar: offer.user.avatar || undefined,
      is_verified: offer.user.is_verified || false,
      seller_rating: offer.user.seller_rating || 0,
      total_products: offer.user.total_products || 0
    } : offer.seller_profile ? {
      id: offer.user_id || 0,
      name: offer.seller_profile,
      email: '',
      is_verified: false,
      seller_rating: 0,
      total_products: 0
    } : undefined,
    reviews: offer.reviews || [],
    stats: {
      total_reviews: Array.isArray(offer.reviews) ? offer.reviews.length : 0,
      average_rating: Array.isArray(offer.reviews) && offer.reviews.length > 0 
        ? offer.reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / offer.reviews.length
        : 0,
      total_sales: offer.clientsCount || offer.stats?.total_sales || 0,
      views_count: offer.stats?.views_count || 0,
    },
  } as MarketplaceProduct;
};

const COUNTRY_NAME_MAP: Record<string, Country> = {
  france: 'FR',
  paris: 'FR',
  canada: 'CA',
  montreal: 'CA',
  belgique: 'BE',
  belgium: 'BE',
  bruxelles: 'BE',
  brussels: 'BE',
  etatsunis: 'US',
  'etats-unis': 'US',
  usa: 'US',
  unitedstates: 'US',
  royaumeuni: 'GB',
  'royaume-uni': 'GB',
  unitedkingdom: 'GB',
  uk: 'GB',
  allemagne: 'DE',
  germany: 'DE',
  espagne: 'ES',
  spain: 'ES',
  italie: 'IT',
  italy: 'IT',
  suisse: 'CH',
  switzerland: 'CH',
  maroc: 'MA',
  tunisie: 'TN',
  canadaenglish: 'CA',
  canadafrench: 'CA',
};

const normalizeLocationKey = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();

const mapOfferLocation = (offer: any): { city?: string; country?: Country } => {
  const rawLocation = offer.localisation || offer.location || offer.city;
  if (!rawLocation || typeof rawLocation !== 'string') {
    return { city: offer.city, country: offer.country };
  }

  const trimmed = rawLocation.trim();
  const key = normalizeLocationKey(trimmed);
  const country = COUNTRY_NAME_MAP[key];

  return {
    city: trimmed,
    country: country || (offer.country as Country | undefined),
  };
};

/**
 * Formatte le prix selon la devise
 */
export const formatPrice = (price: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(price);
};

/**
 * Calcul de la note moyenne
 */
export const calculateAverageRating = (reviews: ProductReview[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};