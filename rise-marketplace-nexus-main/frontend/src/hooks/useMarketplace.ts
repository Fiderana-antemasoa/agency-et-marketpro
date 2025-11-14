// Hooks personnalisés pour la marketplace
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  MarketplaceProduct, 
  MarketplaceFilters, 
  MarketplaceListResponse,
  CategoryOption 
} from '@/types/marketplace';
import { 
  fetchMarketplaceProducts, 
  fetchCategories, 
  searchProducts 
} from '@/services/marketplaceService';

// Hook principal pour la marketplace
export const useMarketplace = (initialFilters: MarketplaceFilters = {}) => {
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12
  });
  
  const [filters, setFilters] = useState<MarketplaceFilters>(initialFilters);

  // Fonction pour charger les produits
  const loadProducts = useCallback(async (newFilters?: MarketplaceFilters, page?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentFilters = newFilters || filters;
      const currentPage = page || currentFilters.page || 1;
      
      const response = await fetchMarketplaceProducts(
        currentFilters,
        currentPage,
        currentFilters.per_page || 12
      );
      
      setProducts(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        total: response.total,
        per_page: response.per_page
      });
      
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error('Marketplace error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fonction pour mettre à jour les filtres
  const updateFilters = useCallback((newFilters: Partial<MarketplaceFilters>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    loadProducts(updatedFilters, 1);
  }, [filters, loadProducts]);

  // Fonction pour changer de page
  const changePage = useCallback((page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    loadProducts(updatedFilters, page);
  }, [filters, loadProducts]);

  // Chargement initial
  useEffect(() => {
    loadProducts();
  }, []);

  // Reset des filtres
  const resetFilters = useCallback(() => {
    const emptyFilters: MarketplaceFilters = { page: 1, per_page: 12 };
    setFilters(emptyFilters);
    loadProducts(emptyFilters);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    resetFilters,
    refetch: () => loadProducts()
  };
};

// Hook pour les catégories
export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        console.error('Categories error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};

// Hook pour la recherche avec debounce
export const useSearch = (delay: number = 300) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce de la requête
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // Recherche des suggestions
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchProducts(debouncedQuery);
        setSuggestions(results);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    clearSuggestions: () => setSuggestions([])
  };
};

// Hook pour la gestion des filtres avec localStorage
export const useMarketplaceFilters = () => {
  const STORAGE_KEY = 'marketplace_filters';

  // Chargement des filtres depuis localStorage
  const loadFiltersFromStorage = useCallback((): MarketplaceFilters => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Error loading filters from storage:', err);
    }
    return {};
  }, []);

  // Sauvegarde des filtres dans localStorage
  const saveFiltersToStorage = useCallback((filters: MarketplaceFilters) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (err) {
      console.error('Error saving filters to storage:', err);
    }
  }, []);

  const [filters, setFilters] = useState<MarketplaceFilters>(loadFiltersFromStorage);

  // Mise à jour des filtres avec sauvegarde
  const updateFilters = useCallback((newFilters: Partial<MarketplaceFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    saveFiltersToStorage(updatedFilters);
  }, [filters, saveFiltersToStorage]);

  // Reset des filtres
  const resetFilters = useCallback(() => {
    setFilters({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Calcul des filtres actifs pour l'affichage
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.price_min !== undefined || filters.price_max !== undefined) count++;
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length;
    if (filters.is_featured) count++;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    activeFiltersCount,
    hasActiveFilters: activeFiltersCount > 0
  };
};