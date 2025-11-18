/**
 * Service pour la synchronisation des tags entre agency-connect et marketplace
 */

const AGENCY_API_URL = "http://127.0.0.1:8000/api";

export interface TagData {
  tag: string;
  count: number;
  category?: string;
}

/**
 * Récupère tous les tags uniques depuis l'API agency-connect
 */
export const fetchTagsFromAgency = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${AGENCY_API_URL}/offers`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des offres');
    }
    
    const offers = await response.json();
    
    // Extraire tous les tags de toutes les offres
    const allTags = new Set<string>();
    
    offers.forEach((offer: any) => {
      if (offer.tags && Array.isArray(offer.tags)) {
        offer.tags.forEach((tag: string) => {
          if (tag && tag.trim()) {
            allTags.add(tag.trim().toLowerCase());
          }
        });
      }
    });
    
    // Convertir en array et trier
    return Array.from(allTags).sort();
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
    // Retourner des tags par défaut en cas d'erreur
    return [
      'design', 'ui', 'ux', 'moderne', 'responsive', 
      'web', 'seo', 'marketing', 'consulting', 'développement'
    ];
  }
};

/**
 * Récupère les tags avec leur nombre d'occurrences
 */
export const fetchTagsWithCount = async (): Promise<TagData[]> => {
  try {
    const response = await fetch(`${AGENCY_API_URL}/offers`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des offres');
    }
    
    const offers = await response.json();
    
    // Compter les occurrences de chaque tag
    const tagCounts = new Map<string, number>();
    
    offers.forEach((offer: any) => {
      if (offer.tags && Array.isArray(offer.tags)) {
        offer.tags.forEach((tag: string) => {
          if (tag && tag.trim()) {
            const normalizedTag = tag.trim().toLowerCase();
            tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
          }
        });
      }
    });
    
    // Convertir en array d'objets et trier par popularité
    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Erreur lors de la récupération des tags avec comptage:', error);
    return [];
  }
};

/**
 * Cache pour éviter trop de requêtes API
 */
let tagsCache: string[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Récupère les tags avec mise en cache
 */
export const getCachedTags = async (): Promise<string[]> => {
  const now = Date.now();
  
  // Vérifier si le cache est encore valide
  if (tagsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return tagsCache;
  }
  
  // Récupérer les nouveaux tags
  tagsCache = await fetchTagsFromAgency();
  cacheTimestamp = now;
  
  return tagsCache;
};

/**
 * Invalide le cache des tags (à appeler après ajout/modification d'une offre)
 */
export const invalidateTagsCache = (): void => {
  tagsCache = null;
  cacheTimestamp = 0;
};

/**
 * Filtre les tags selon une recherche
 */
export const filterTags = (tags: string[], searchQuery: string): string[] => {
  if (!searchQuery.trim()) return tags;
  
  const query = searchQuery.toLowerCase().trim();
  return tags.filter(tag => tag.toLowerCase().includes(query));
};

/**
 * Récupère les tags les plus populaires (limité à un nombre donné)
 */
export const getPopularTags = async (limit: number = 10, forceRefresh: boolean = false): Promise<string[]> => {
  if (forceRefresh) {
    invalidateTagsCache();
  }
  
  const tagsWithCount = await fetchTagsWithCount();
  return tagsWithCount.slice(0, limit).map(item => item.tag);
};

/**
 * Force le rafraîchissement des tags (ignore le cache)
 */
export const refreshTags = async (limit: number = 10): Promise<string[]> => {
  return getPopularTags(limit, true);
};
