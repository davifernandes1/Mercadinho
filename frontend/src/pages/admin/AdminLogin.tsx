import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      navigate("/admin/dashboard");
    } else {
      toast.error("PIN incorreto!");
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
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold bg-success hover:bg-success/90 text-success-foreground"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
