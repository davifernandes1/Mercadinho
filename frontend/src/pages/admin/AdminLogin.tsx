//
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tenta buscar a senha real do servidor
      const response = await fetch('http://localhost:3001/api/settings');
      
      let currentPin = "1234"; // Valor padrão

      if (response.ok) {
        const settings = await response.json();
        currentPin = settings.adminPin || "1234";
        
        // DEBUG: Mostra no console do navegador (F12) qual é o PIN real no banco
        console.log("PIN vindo do Banco de Dados:", currentPin);
      } else {
        console.warn("API Offline ou erro ao buscar settings");
      }

      // --- LÓGICA DE CHAVE MESTRA ---
      // Aceita se o PIN for igual ao do banco OU se for "1234" (backdoor para você entrar)
      if (pin === currentPin || pin === "1234") {
        toast.success("Bem-vindo!");
        navigate("/admin/dashboard");
      } else {
        toast.error(`PIN incorreto! (Dica: O PIN do banco é ${currentPin})`);
      }

    } catch (error) {
      console.warn("Erro de conexão:", error);
      
      // Se der erro de conexão, permite entrar com 1234
      if (pin === "1234") {
        toast.warning("Modo Offline: Acesso concedido.");
        navigate("/admin/dashboard");
      } else {
        toast.error("Erro de conexão. Tente '1234'.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-glass flex items-center justify-center p-8 animate-fade-in">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-glass" onClick={() => navigate("/")} />
      
      <div className="relative bg-card rounded-3xl border border-border shadow-float p-12 w-full max-w-md animate-scale-in z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>

        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Acesso Administrativo
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="pin" className="text-lg font-semibold">
              PIN de Acesso
            </Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Digite o PIN"
              className="h-14 text-lg mt-2"
              maxLength={4}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 text-lg font-bold bg-success hover:bg-success/90 text-success-foreground"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;