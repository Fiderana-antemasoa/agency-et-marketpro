import { useState, useEffect } from "react";
import { Mail, Loader2, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { apiService, ForgotPasswordData } from '@/services/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Ajouts pour countdown + resend
  const [countdown, setCountdown] = useState(60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isSubmitted, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data: ForgotPasswordData = { email };
      const response = await apiService.forgotPassword(data);

      if (response.success) {
        setMessage("Un email de réinitialisation a été envoyé si l'adresse existe.");
        setIsSubmitted(true);
        setCountdown(60);
        setCanResend(false);

        // Activer renvoi après 3s
        setTimeout(() => setCanResend(true), 3000);
      } else {
        setError(response.message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data: ForgotPasswordData = { email };
      const response = await apiService.forgotPassword(data);

      if (response.success) {
        setMessage(`Nouvel email envoyé à ${email}`);
        setCountdown(60);
        setCanResend(false);
        setTimeout(() => setCanResend(true), 3000);
      } else {
        setError("Impossible de renvoyer l'email. Veuillez patienter!");
      }
    } catch (err: any) {
      setError("Impossible de renvoyer l'email. Veuillez patienter!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marketplace-orange/10 to-marketplace-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-marketplace-orange/10 rounded-full w-fit">
              <Mail className="h-8 w-8 text-marketplace-orange" />
            </div>
            <CardTitle className="text-2xl font-bold">Mot de passe oublié</CardTitle>
            <CardDescription>
              Entrez votre email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-marketplace-orange hover:bg-marketplace-orange/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le lien de réinitialisation"
                  )}
                </Button>

                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center text-sm text-marketplace-blue hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Retour à la connexion
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {message && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Vérifiez votre boîte email et cliquez sur le lien pour réinitialiser votre mot de passe.
                  </p>

                  {canResend ? (
                    <Button
                      onClick={handleResend}
                      variant="outline"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Renvoi...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Renvoyer l'email
                        </>
                      )}
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Vous pourrez renvoyer l'email dans {countdown} secondes
                    </p>
                  )}

                  <Link 
                    to="/login" 
                    className="inline-flex items-center text-sm text-marketplace-blue hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Retour à la connexion
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
