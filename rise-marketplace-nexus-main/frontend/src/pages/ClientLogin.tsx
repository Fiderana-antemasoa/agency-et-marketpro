import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ShoppingBag, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService, LoginCredentials } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export const ClientLogin = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const loginData: LoginCredentials = {
        email: formData.email,
        password: formData.password,
      };

      const response = await apiService.login(loginData);
      
      if (response.success && response.data?.user) {
        login(response.data.user);
        alert('Connexion réussie ! Bienvenue sur MarketPro.');
        window.location.href = '/marketplace';
      } else {
        alert(response.message || 'Erreur lors de la connexion');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || 'Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marketplace-orange/10 to-marketplace-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="hidden md:block space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue sur Market<span className="text-marketplace-orange">Pro</span>
            </h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre compte et profiter de tous nos services
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-marketplace-orange/10 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-marketplace-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Vos commandes</h3>
                <p className="text-sm text-gray-600">Suivez l'état de vos achats</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-marketplace-blue/10 rounded-lg">
                <Truck className="h-6 w-6 text-marketplace-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Livraison rapide</h3>
                <p className="text-sm text-gray-600">Livraison gratuite dès 50€</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-success/10 rounded-lg">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Compte sécurisé</h3>
                <p className="text-sm text-gray-600">Vos données sont protégées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Se connecter</CardTitle>
            <CardDescription>
              Accédez à votre compte MarketPro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-marketplace-blue hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-marketplace-orange hover:bg-marketplace-orange/90"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-marketplace-blue hover:underline font-medium">
                  S'inscrire
                </Link>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Comptes de test :</p>
                <p>Client : jean.dupont@example.com / password123</p>
                <p>Admin : admin@marketpro.com / admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
