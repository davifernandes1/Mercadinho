import { Home, List, HelpCircle } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

export const CustomerSidebar = () => {
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
