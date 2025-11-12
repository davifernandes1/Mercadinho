import { LayoutDashboard, Package, TrendingUp, Settings, LogOut, Calendar } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockSales = [
  { id: "001", date: "2025-11-12 14:32", items: "Coca-Cola 2L, Pão Francês x3", total: 10.49, status: "Pago" },
  { id: "002", date: "2025-11-12 13:15", items: "Arroz 5kg, Feijão 1kg, Óleo", total: 35.40, status: "Pago" },
  { id: "003", date: "2025-11-12 12:08", items: "Leite Integral, Café 500g", total: 18.90, status: "Pago" },
  { id: "004", date: "2025-11-12 11:45", items: "Refrigerante x2, Salgadinho", total: 14.97, status: "Pago" },
];

const AdminSales = () => {
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
        <h1 className="text-4xl font-bold text-primary mb-8">Histórico de Vendas</h1>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="h-10">
            <Calendar className="w-4 h-4 mr-2" />
            Hoje
          </Button>
          <Button variant="outline" className="h-10">
            Últimos 7 dias
          </Button>
          <Button variant="outline" className="h-10">
            Escolher período
          </Button>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elegant overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-bold text-foreground">ID do Pedido</th>
                <th className="text-left p-4 font-bold text-foreground">Data/Hora</th>
                <th className="text-left p-4 font-bold text-foreground">Itens</th>
                <th className="text-left p-4 font-bold text-foreground">Valor Total</th>
                <th className="text-left p-4 font-bold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSales.map((sale) => (
                <tr key={sale.id} className="border-t border-border hover:bg-muted/50 smooth-transition">
                  <td className="p-4 font-bold text-primary">#{sale.id}</td>
                  <td className="p-4 text-foreground">{sale.date}</td>
                  <td className="p-4 text-muted-foreground">{sale.items}</td>
                  <td className="p-4 font-bold text-primary">R$ {sale.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-success text-success-foreground">
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminSales;
