import {
  Home,
  HelpCircle,
  LayoutDashboard,
  Package,
  TrendingUp,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categories } from "@/lib/categories";
import { useCart } from "@/context/CartContext"; // Importe o useCart aqui

// Componente interno SÓ para o Cliente (que usa o hook)
const CustomerSidebarInternal = () => {
  const { setIsHelpModalOpen } = useCart(); // O hook é chamado SÓ AQUI

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-card border-r border-border flex flex-col items-center py-6 z-10 shadow-elegant justify-between">
      {/* Links do Topo */}
      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/home"
              className="inline-flex items-center justify-center h-12 w-12 rounded-lg"
            >
              <Store className="w-6 h-6 text-primary" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Mercadinho</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/home"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
              activeClassName="bg-primary/10 text-primary scale-105"
            >
              <Home className="w-5 h-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Início</p>
          </TooltipContent>
        </Tooltip>

        {categories.map((category) => (
          <Tooltip key={category.id}>
            <TooltipTrigger asChild>
              <NavLink
                to={`/category/${category.id}`}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
                activeClassName="bg-primary/10 text-primary scale-105"
              >
                <category.icon className="w-5 h-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{category.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Botão de Ajuda (Embaixo) */}
      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="smooth-transition hover:bg-muted hover:scale-110"
              onClick={() => setIsHelpModalOpen(true)}
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Ajuda</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};

// Componente interno SÓ para o Admin (NÃO usa o hook)
const AdminSidebarInternal = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-card border-r border-border flex flex-col items-center py-6 z-10 shadow-elegant justify-between">
      {/* Links do Topo */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">A</span>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/admin/dashboard"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
              activeClassName="bg-primary/10 text-primary scale-105"
            >
              <LayoutDashboard className="w-5 h-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/admin/products"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
              activeClassName="bg-primary/10 text-primary scale-105"
            >
              <Package className="w-5 h-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Produtos</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/admin/sales"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
              activeClassName="bg-primary/10 text-primary scale-105"
            >
              <TrendingUp className="w-5 h-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Vendas</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            {/* --- BOTÃO ATUALIZADO --- */}
            <NavLink
              to="/admin/settings"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg smooth-transition hover:bg-muted hover:scale-110"
              activeClassName="bg-primary/10 text-primary scale-105"
            >
              <Settings className="w-5 h-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Configurações</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Botão de Sair (Embaixo) */}
      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10 text-destructive hover:scale-110"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sair</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};

// Componente principal que decide qual sidebar renderizar
export const CustomerSidebar = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  if (isAdmin) {
    return <AdminSidebarInternal />;
  }
  return <CustomerSidebarInternal />;
};