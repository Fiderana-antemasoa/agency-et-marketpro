import type { MarketplaceProduct } from '@/types/marketplace';

/**
 * Fonction de recherche avancée pour les produits marketplace
 * Recherche dans : titre, description, tags, nom vendeur, marque, spécifications
 */
export const searchProducts = (products: MarketplaceProduct[], searchQuery: string): MarketplaceProduct[] => {
  if (!searchQuery || !searchQuery.trim()) {
    return products;
  }

  const q = searchQuery.toLowerCase().trim();
  
  return products.filter(product => {
    // Recherche dans le titre du produit
    const titleMatch = product.title.toLowerCase().includes(q);
    
    // Recherche dans la description
    const descriptionMatch = product.description.toLowerCase().includes(q);
    
    // Recherche dans les tags
    const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(q));
    
    // Recherche dans le nom du vendeur
    const sellerMatch = product.user?.name?.toLowerCase().includes(q) || false;
    
    // Recherche dans la marque
    const brandMatch = product.brand?.toLowerCase().includes(q) || false;
    
    // Recherche dans les spécifications (format, compatibility, etc.)
    const specsMatch = Object.values(product.specifications || {}).some(spec => 
      String(spec).toLowerCase().includes(q)
    );
    
    // Recherche dans les features
    const featuresMatch = product.features.some(feature => 
      feature.toLowerCase().includes(q)
    );
    
    return titleMatch || descriptionMatch || tagsMatch || sellerMatch || brandMatch || specsMatch || featuresMatch;
  });
};

/**
 * Fonction pour mettre en évidence les termes de recherche dans un texte
 */
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm || !searchTerm.trim()) {
    return text;
  }
  
  const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Fonction pour obtenir des suggestions de recherche basées sur les produits
 */
export const getSearchSuggestions = (products: MarketplaceProduct[], query: string): string[] => {
  if (!query || query.length < 2) {
    return [];
  }
  
  const q = query.toLowerCase();
  const suggestions = new Set<string>();
  
  products.forEach(product => {
    // Suggestions basées sur le titre
    if (product.title.toLowerCase().includes(q)) {
      suggestions.add(product.title);
    }
    
    // Suggestions basées sur les tags
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(q)) {
        suggestions.add(tag);
      }
    });
    
    // Suggestions basées sur le nom du vendeur
    if (product.user?.name?.toLowerCase().includes(q)) {
      suggestions.add(product.user.name);
    }
    
    // Suggestions basées sur la marque
    if (product.brand?.toLowerCase().includes(q)) {
      suggestions.add(product.brand);
    }
  });
  
  return Array.from(suggestions).slice(0, 8); // Limiter à 8 suggestions
};
