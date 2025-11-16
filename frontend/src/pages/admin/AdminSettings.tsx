import { useState } from "react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const AdminSettings = () => {
  const [adminPin, setAdminPin] = useState("");
  const [newAdminPin, setNewAdminPin] = useState("");
  const [marketName, setMarketName] = useState("Mercadinho do Condomínio");

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("PIN de administrador atualizado!");
    setAdminPin("");
    setNewAdminPin("");
  };

  const handleSaveKiosk = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações do kiosk salvas!");
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Configurações</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Card de Segurança */}
          <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Segurança</CardTitle>
              <CardDescription>
                Altere o PIN de acesso à área administrativa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                {/* --- CORREÇÃO DE ESTILO --- */}
                <div className="space-y-2">
                  <Label htmlFor="adminPin">PIN Atual</Label>
                  <Input
                    id="adminPin"
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    maxLength={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newAdminPin">Novo PIN</Label>
                  <Input
                    id="newAdminPin"
                    type="password"
                    value={newAdminPin}
                    onChange={(e) => setNewAdminPin(e.target.value)}
                    maxLength={4}
                  />
                </div>
                {/* --- FIM DA CORREÇÃO --- */}
                <Button type="submit" className="h-12 px-6 text-base">
                  Salvar PIN
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Card de Configurações do Kiosk */}
          <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Kiosk</CardTitle>
              <CardDescription>
                Personalize as informações do seu mercadinho.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveKiosk} className="space-y-6">
                {/* --- CORREÇÃO DE ESTILO --- */}
                <div className="space-y-2">
                  <Label htmlFor="marketName">Nome do Mercadinho</Label>
                  <Input
                    id="marketName"
                    type="text"
                    value={marketName}
                    onChange={(e) => setMarketName(e.target.value)}
                  />
                </div>
                {/* --- FIM DA CORREÇÃO --- */}
                <Button type="submit" className="h-12 px-6 text-base">
                  Salvar Configurações
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;