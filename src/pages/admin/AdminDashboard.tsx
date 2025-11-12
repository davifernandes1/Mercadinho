import { LayoutDashboard, Package, TrendingUp, Settings, LogOut, AlertTriangle, XCircle, Clock } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 shadow-elegant">
        <h2 className="text-2xl font-bold text-primary mb-8">Admin</h2>
        
        <nav className="space-y-2 mb-8">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg smooth-transition hover:bg-muted"
            activeClassName="bg-muted text-primary font-semibold"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className="flex items-center gap-3 p-3 rounded-lg smooth-transition hover:bg-muted"
            activeClassName="bg-muted text-primary font-semibold"
          >
            <Package className="w-5 h-5" />
            Produtos
          </NavLink>
          <NavLink
            to="/admin/sales"
            className="flex items-center gap-3 p-3 rounded-lg smooth-transition hover:bg-muted"
            activeClassName="bg-muted text-primary font-semibold"
          >
            <TrendingUp className="w-5 h-5" />
            Vendas
          </NavLink>
          <button className="flex items-center gap-3 p-3 rounded-lg smooth-transition hover:bg-muted w-full text-left">
            <Settings className="w-5 h-5" />
            Configurações
          </button>
        </nav>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </aside>

      <main className="ml-64 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-2xl border border-border shadow-elegant p-6">
            <p className="text-muted-foreground mb-2">Total Arrecadado Hoje</p>
            <p className="text-3xl font-bold text-primary">R$ 1.547,80</p>
            <p className="text-sm text-muted-foreground mt-1">32 pedidos</p>
          </div>

          <div className="bg-warning/10 border-2 border-warning rounded-2xl shadow-elegant p-6">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <p className="font-bold text-warning-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-warning-foreground mt-1">8 produtos</p>
              </div>
            </div>
          </div>

          <div className="bg-destructive/10 border-2 border-destructive rounded-2xl shadow-elegant p-6">
            <div className="flex items-start gap-3 mb-2">
              <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
              <div>
                <p className="font-bold text-foreground">Esgotados</p>
                <p className="text-2xl font-bold text-destructive mt-1">3 produtos</p>
              </div>
            </div>
          </div>

          <div className="bg-muted border-2 border-border rounded-2xl shadow-elegant p-6">
            <div className="flex items-start gap-3 mb-2">
              <Clock className="w-6 h-6 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-bold text-foreground">Encalhados</p>
                <p className="text-2xl font-bold text-muted-foreground mt-1">5 produtos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elegant p-6 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Vendas dos Últimos 7 Dias</h2>
          <div className="h-64 flex items-end gap-4">
            {[450, 680, 520, 890, 750, 920, 1100].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary rounded-t-lg smooth-transition hover:bg-primary/80"
                  style={{ height: `${(value / 1100) * 100}%` }}
                />
                <p className="text-sm font-semibold text-muted-foreground">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-border shadow-elegant p-6">
            <h2 className="text-xl font-bold text-warning mb-4">Produtos com Estoque Baixo</h2>
            <div className="space-y-3">
              {["Coca-Cola 2L - 3 unidades", "Pão Francês - 2 unidades", "Leite Integral - 4 unidades"].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <span className="text-foreground">{item}</span>
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                    Repor
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-elegant p-6">
            <h2 className="text-xl font-bold text-muted-foreground mb-4">Produtos Encalhados</h2>
            <div className="space-y-3">
              {["Achocolatado X - 45 dias", "Biscoito Y - 38 dias", "Suco Z - 32 dias"].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-foreground">{item}</span>
                  <Button size="sm" variant="outline">
                    Promoção
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
