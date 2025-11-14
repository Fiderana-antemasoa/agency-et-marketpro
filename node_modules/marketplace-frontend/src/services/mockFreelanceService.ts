import type { 
  User, 
  FreelanceService, 
  DigitalProduct, 
  Order, 
  Review, 
  Message,
  Conversation,
  FreelanceStats,
  Transaction
} from '@/types/freelance';

// Mock current user - in real app, this comes from auth
const MOCK_USER_ID = 'user_1';
const MOCK_USER_ROLE = 'freelance'; // Change to 'client' or 'admin' to test

export const getCurrentUser = (): User => {
  const stored = localStorage.getItem('mock_user');
  if (stored) return JSON.parse(stored);
  
  return {
    id: MOCK_USER_ID,
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: MOCK_USER_ROLE as any,
    bio: 'Développeur web full-stack avec 5 ans d\'expérience',
    skills: ['React', 'Node.js', 'TypeScript', 'UI/UX Design'],
    languages: ['Français', 'Anglais'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    created_at: '2024-01-01',
    rating: 4.8,
    total_reviews: 42,
    total_sales: 156
  };
};

export const mockFreelancers: User[] = [
  {
    id: 'freelance_1',
    name: 'Marie Martin',
    email: 'marie@example.com',
    role: 'freelance',
    bio: 'Designer UI/UX passionnée par la création d\'expériences utilisateur exceptionnelles',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    languages: ['Français', 'Anglais'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    created_at: '2023-06-15',
    rating: 4.9,
    total_reviews: 67,
    total_sales: 203
  },
  {
    id: 'freelance_2',
    name: 'Ahmed Diallo',
    email: 'ahmed@example.com',
    role: 'freelance',
    bio: 'Expert en marketing digital et création de contenu',
    skills: ['SEO', 'Google Ads', 'Content Marketing', 'Analytics'],
    languages: ['Français', 'Arabe', 'Anglais'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    created_at: '2023-08-20',
    rating: 4.7,
    total_reviews: 34,
    total_sales: 89
  }
];

export const mockServices: FreelanceService[] = [
  {
    id: 'service_1',
    user_id: 'freelance_1',
    title: 'Design d\'interface moderne pour application mobile',
    description: 'Je créerai une interface utilisateur moderne et intuitive pour votre application mobile. Comprend 5 écrans, wireframes, et fichiers Figma sources.',
    price: 25000,
    delivery_days: 7,
    category: 'design',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800'],
    status: 'active',
    created_at: '2024-03-01',
    total_orders: 23,
    rating: 4.9
  },
  {
    id: 'service_2',
    user_id: 'freelance_2',
    title: 'Stratégie SEO complète pour site web',
    description: 'Audit SEO complet, recherche de mots-clés, optimisation on-page et plan de contenu pour booster votre visibilité.',
    price: 35000,
    delivery_days: 10,
    category: 'marketing',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'],
    status: 'active',
    created_at: '2024-02-15',
    total_orders: 15,
    rating: 4.8
  }
];

export const mockProducts: DigitalProduct[] = [
  {
    id: 'product_1',
    user_id: 'freelance_1',
    title: 'Kit UI/UX - 50 composants Figma',
    description: 'Collection complète de 50 composants UI réutilisables pour Figma',
    price: 15000,
    preview_images: ['https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800'],
    category: 'design',
    status: 'active',
    created_at: '2024-01-10',
    downloads: 145
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order_1',
    client_id: 'client_1',
    freelance_id: MOCK_USER_ID,
    service_id: 'service_1',
    status: 'in_progress',
    amount: 25000,
    commission: 2500,
    payment_status: 'partial',
    paid_amount: 12500,
    created_at: '2024-03-15',
    delivery_date: '2024-03-22'
  },
  {
    id: 'order_2',
    client_id: 'client_2',
    freelance_id: MOCK_USER_ID,
    service_id: 'service_2',
    status: 'completed',
    amount: 35000,
    commission: 3500,
    payment_status: 'completed',
    paid_amount: 35000,
    created_at: '2024-03-10',
    delivery_date: '2024-03-20'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review_1',
    freelance_id: MOCK_USER_ID,
    user_id: 'client_1',
    order_id: 'order_2',
    rating: 5,
    comment: 'Excellent travail, très professionnel et à l\'écoute !',
    created_at: '2024-03-21'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg_1',
    sender_id: 'client_1',
    receiver_id: MOCK_USER_ID,
    content: 'Bonjour, j\'aimerais discuter de mon projet',
    created_at: '2024-03-15T10:30:00',
    read: true,
    order_id: 'order_1'
  }
];

// Service functions
export const getFreelancers = async (filters?: any): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockFreelancers;
};

export const getFreelancerById = async (id: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockFreelancers.find(f => f.id === id) || null;
};

export const getFreelanceServices = async (userId?: string): Promise<FreelanceService[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (userId) return mockServices.filter(s => s.user_id === userId);
  return mockServices;
};

export const getDigitalProducts = async (userId?: string): Promise<DigitalProduct[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (userId) return mockProducts.filter(p => p.user_id === userId);
  return mockProducts;
};

export const getOrders = async (userId: string, role: 'client' | 'freelance'): Promise<Order[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (role === 'freelance') {
    return mockOrders.filter(o => o.freelance_id === userId);
  }
  return mockOrders.filter(o => o.client_id === userId);
};

export const getFreelanceStats = async (userId: string): Promise<FreelanceStats> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return {
    total_sales: 156,
    total_revenue: 4250000,
    active_orders: 5,
    completed_orders: 151,
    average_rating: 4.8,
    total_reviews: 42,
    pending_withdrawals: 125000,
    available_balance: 850000
  };
};

export const getConversations = async (userId: string): Promise<Conversation[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [];
};

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [];
};

// Note: Dans une vraie application, toutes ces fonctions appelleraient des API backend
export const createService = async (data: Partial<FreelanceService>): Promise<FreelanceService> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newService: FreelanceService = {
    id: `service_${Date.now()}`,
    user_id: MOCK_USER_ID,
    title: data.title || '',
    description: data.description || '',
    price: data.price || 0,
    delivery_days: data.delivery_days || 1,
    category: data.category || 'other',
    images: data.images || [],
    status: 'active',
    created_at: new Date().toISOString(),
    total_orders: 0,
    rating: 0
  };
  mockServices.push(newService);
  return newService;
};

export const createProduct = async (data: Partial<DigitalProduct>): Promise<DigitalProduct> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct: DigitalProduct = {
    id: `product_${Date.now()}`,
    user_id: MOCK_USER_ID,
    title: data.title || '',
    description: data.description || '',
    price: data.price || 0,
    preview_images: data.preview_images || [],
    category: data.category || 'other',
    status: 'active',
    created_at: new Date().toISOString(),
    downloads: 0
  };
  mockProducts.push(newProduct);
  return newProduct;
};

export const createOrder = async (data: Partial<Order>): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    client_id: data.client_id || MOCK_USER_ID,
    freelance_id: data.freelance_id || '',
    service_id: data.service_id,
    product_id: data.product_id,
    status: 'pending',
    amount: data.amount || 0,
    commission: (data.amount || 0) * 0.1,
    payment_status: 'pending',
    paid_amount: 0,
    created_at: new Date().toISOString()
  };
  mockOrders.push(newOrder);
  return newOrder;
};
