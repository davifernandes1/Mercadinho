import { LayoutDashboard, Package, TrendingUp, Settings, LogOut, Search, Plus, Edit, Trash2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const mockProducts = [
  { id: 1, name: "Coca-Cola 2L", category: "Bebidas", price: 8.99, stock: 25 },
  { id: 2, name: "Pão Francês", category: "Padaria", price: 0.50, stock: 3 },
  { id: 3, name: "Leite Integral 1L", category: "Laticínios", price: 4.50, stock: 0 },
  { id: 4, name: "Arroz 5kg", category: "Mercearia", price: 22.90, stock: 15 },
  { id: 5, name: "Feijão 1kg", category: "Mercearia", price: 7.50, stock: 8 },
];

const AdminProducts = () => {
  const navigate = useNavigate();

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive text-destructive-foreground" };
    if (stock < 5) return { text: "Baixo", class: "bg-warning text-warning-foreground" };
    return { text: "OK", class: "bg-success text-success-foreground" };
  };

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Gerenciar Produtos</h1>
          <Button className="h-12 px-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Novo Produto
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-12 h-12 rounded-xl border-2"
          />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elegant overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-bold text-foreground">Produto</th>
                <th className="text-left p-4 font-bold text-foreground">Categoria</th>
                <th className="text-left p-4 font-bold text-foreground">Preço</th>
                <th className="text-left p-4 font-bold text-foreground">Estoque</th>
                <th className="text-left p-4 font-bold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => {
                const badge = getStockBadge(product.stock);
                return (
                  <tr key={product.id} className="border-t border-border hover:bg-muted/50 smooth-transition">
                    <td className="p-4 font-semibold text-foreground">{product.name}</td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>
                    <td className="p-4 font-bold text-primary">R$ {product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${badge.class}`}>
                        {badge.text} ({product.stock})
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:bg-primary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
