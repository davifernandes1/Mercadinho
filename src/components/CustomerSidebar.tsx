import { Home, List, HelpCircle, LayoutDashboard, Package, TrendingUp, Settings, LogOut } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CustomerSidebarProps {
  isAdmin?: boolean;
}

export const CustomerSidebar = ({ isAdmin = false }: CustomerSidebarProps) => {
  const navigate = useNavigate();

  if (isAdmin) {
    return (
      <aside className="fixed left-0 top-0 h-full w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-4 z-10 shadow-elegant">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">A</span>
          </div>
        </div>

        <NavLink
          to="/admin/dashboard"
          className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted"
          activeClassName="bg-primary/10 text-primary"
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted"
          activeClassName="bg-primary/10 text-primary"
        >
          <Package className="w-6 h-6" />
          <span className="text-xs font-medium">Produtos</span>
        </NavLink>

        <NavLink
          to="/admin/sales"
          className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted"
          activeClassName="bg-primary/10 text-primary"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs font-medium">Vendas</span>
        </NavLink>

        <button className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted">
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Config</span>
        </button>

        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="flex flex-col items-center gap-2 p-3 rounded-lg mt-auto hover:bg-destructive/10 text-destructive"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Sair</span>
        </Button>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6 z-10 shadow-elegant">
      <NavLink
        to="/home"
        className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted"
        activeClassName="bg-primary/10 text-primary"
      >
        <Home className="w-6 h-6" />
        <span className="text-xs font-medium">Início</span>
      </NavLink>

      <NavLink
        to="/home"
        className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted"
        activeClassName="bg-primary/10 text-primary"
      >
        <List className="w-6 h-6" />
        <span className="text-xs font-medium">Categorias</span>
      </NavLink>

      <button className="flex flex-col items-center gap-2 p-3 rounded-lg smooth-transition hover:bg-muted mt-auto">
        <HelpCircle className="w-6 h-6" />
        <span className="text-xs font-medium">Ajuda</span>
      </button>
    </aside>
  );
};
