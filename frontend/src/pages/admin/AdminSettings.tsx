//
import { useState, useEffect } from "react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

// Interface para o corpo da requisição
interface SettingsPayload {
  marketName: string;
  adminPin?: string;
}

const AdminSettings = () => {
  const [adminPin, setAdminPin] = useState("");
  const [newAdminPin, setNewAdminPin] = useState("");
  const [marketName, setMarketName] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar configurações ao carregar
  useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then(data => {
        if(data.marketName) setMarketName(data.marketName);
      })
      .catch(err => {
        console.error("Erro:", err);
        toast.error("Não foi possível carregar as configurações.");
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Monta objeto tipado corretamente
    const body: SettingsPayload = { marketName };
    
    // Só envia o PIN se ele tiver exatamente 4 dígitos
    if (newAdminPin.length === 4) {
      body.adminPin = newAdminPin;
    } else if (newAdminPin.length > 0 && newAdminPin.length !== 4) {
      toast.warning("O PIN deve ter exatamente 4 dígitos.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Falha ao salvar");
      
      toast.success("Configurações atualizadas com sucesso!");
      setNewAdminPin(""); 
      setAdminPin(""); // Limpa o campo de confirmação visual
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configurações no servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Configurações</h1>
        <div className="max-w-4xl">
           <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle>Geral & Segurança</CardTitle>
              <CardDescription>Atualize o nome do mercado e o PIN de acesso administrativo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="marketName">Nome do Mercadinho</Label>
                  <Input 
                    id="marketName" 
                    value={marketName} 
                    onChange={e => setMarketName(e.target.value)} 
                    placeholder="Ex: Mercadinho do Bloco C"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Campo apenas visual ou para validação futura */}
                   <div className="space-y-2">
                    <Label htmlFor="adminPin">PIN Atual (Opcional)</Label>
                    <Input
                      id="adminPin"
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      maxLength={4}
                      placeholder="****"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPin" className="text-primary font-semibold">Novo PIN (4 dígitos)</Label>
                    <Input 
                      id="newPin" 
                      type="text" // Mudado para text momentaneamente para ver o que digita, ou password
                      inputMode="numeric"
                      maxLength={4} 
                      value={newAdminPin} 
                      onChange={e => setNewAdminPin(e.target.value.replace(/\D/g, ''))} 
                      placeholder="Digite para alterar"
                      className="border-primary/30 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">Deixe em branco para manter o PIN atual.</p>
                  </div>
                </div>

                <Button type="submit" className="h-12 px-8 font-bold text-lg" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2"/> : <Save className="w-5 h-5 mr-2"/>}
                  Salvar Alterações
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