import React, { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService, ResetPasswordData } from '@/services/api';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Vérification des critères
  const criteria = [
    { test: password.length >= 8, label: "Au moins 8 caractères" },
    { test: /[A-Z]/.test(password), label: "Une majuscule" },
    { test: /[a-z]/.test(password), label: "Une minuscule" },
    { test: /[0-9]/.test(password), label: "Un chiffre" },
  ];

  const unmetCriteria = criteria.filter((c) => !c.test);
  const allCriteriaMet = unmetCriteria.length === 0;
  const passwordsMatch = password === passwordConfirmation && passwordConfirmation !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!token) {
      setError("Token de réinitialisation manquant.");
      setLoading(false);
      return;
    }

    try {
      const data: ResetPasswordData = {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      };

      const response = await apiService.resetPassword(data);

      if (response.success) {
        setMessage("Mot de passe réinitialisé avec succès !");
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Erreur lors de la réinitialisation.");
        setIsSuccess(false);
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || "Erreur lors de la réinitialisation.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marketplace-orange/10 to-marketplace-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-marketplace-blue/10 rounded-full w-fit">
              <Lock className="h-8 w-8 text-marketplace-blue" />
            </div>
            <CardTitle className="text-2xl font-bold">Réinitialiser le mot de passe</CardTitle>
            <CardDescription>
              Choisissez un nouveau mot de passe sécurisé
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <div className={`mb-4 p-3 rounded-lg border ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center">
                  {isSuccess && <CheckCircle className="h-4 w-4 text-green-600 mr-2" />}
                  <p className={`text-sm font-medium ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                    {message}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email (lecture seule) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              {/* Nouveau mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
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

                {/* ✅ Affiche seulement les critères NON remplis */}
                {password && unmetCriteria.length > 0 && (
                  <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">Critères manquants :</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {unmetCriteria.map((c, index) => (
                        <li key={index}>• {c.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirmation */}
              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="passwordConfirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez votre mot de passe"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* Message de correspondance */}
                {passwordConfirmation && !passwordsMatch && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 text-center">
                      Les mots de passe ne correspondent pas
                    </p>
                  </div>
                )}
              </div>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                disabled={loading || !allCriteriaMet || !passwordsMatch}
                className="w-full bg-marketplace-orange hover:bg-marketplace-orange/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Réinitialisation...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <p>Vous serez redirigé vers la page de connexion après la réinitialisation.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
