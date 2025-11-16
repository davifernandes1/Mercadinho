import { Search } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/categories";
import { HelpModal } from "@/components/HelpModal"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar />
      <CartPanel />
      <FloatingCart />
      <HelpModal /> {/* <-- "O que faltou" (Adicionado aqui) */}

      <main className="ml-20 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-primary whitespace-nowrap">
              Mercadinho
            </h1>

          </div>
        </header>

        {/* --- Hero Section --- */}
        <section className="mb-12">
          <div
            className="h-80 rounded-3xl bg-cover bg-center relative overflow-hidden shadow-elegant"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h2 className="text-5xl font-bold mb-4">Produtos Frescos</h2>
                <p className="text-xl mb-6">Qualidade e frescor todos os dias</p>
                <Button
                  onClick={() => navigate("/category/hortifruti")}
                  className="h-12 px-8 text-lg font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Ver Produtos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Categories Section --- */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Categorias</h2>
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden border-2 border-border hover:border-primary hover:shadow-float smooth-transition hover:scale-105 active:scale-95"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* --- Seção "Mais Vendidos" --- */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Mais Vendidos</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border shadow-elegant p-4 hover:shadow-float smooth-transition"
              >
                <div className="aspect-square bg-muted rounded-xl mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  Produto {i}
                </h3>
                <p className="text-2xl font-bold text-primary mb-3">R$ 9,99</p>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  + Adicionar
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* --- Seção "Promoções" --- */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-6">Promoções</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border shadow-elegant p-4 hover:shadow-float smooth-transition relative"
              >
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -20%
                </div>
                <div className="aspect-square bg-muted rounded-xl mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  Oferta {i}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-lg text-muted-foreground line-through">
                    R$ 12,99
                  </p>
                  <p className="text-2xl font-bold text-primary">R$ 10,39</p>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  + Adicionar
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;