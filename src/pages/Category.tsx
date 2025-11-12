import { ArrowLeft, Search } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const mockProducts = [
  { id: "1", name: "Coca-Cola 2L", price: 8.99, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop", stock: 25 },
  { id: "2", name: "Guaraná Antarctica 2L", price: 7.99, image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop", stock: 3 },
  { id: "3", name: "Suco Del Valle 1L", price: 6.50, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop", stock: 0 },
  { id: "4", name: "Água Mineral 500ml", price: 2.50, image: "https://images.unsplash.com/photo-1559839914-17aae19f55da?w=300&h=300&fit=crop", stock: 50 },
  { id: "5", name: "Cerveja Heineken Lata", price: 4.99, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop", stock: 15 },
  { id: "6", name: "Energético Red Bull", price: 9.99, image: "https://images.unsplash.com/photo-1622543925917-763c34c1a86e?w=300&h=300&fit=crop", stock: 8 },
];

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem } = useCart();

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive text-destructive-foreground" };
    if (stock < 5) return { text: "Poucas unidades!", class: "bg-warning text-warning-foreground" };
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerSidebar />
      <CartPanel />
      <FloatingCart />

      <main className="ml-20 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-4xl font-bold text-primary capitalize">{id}</h1>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder={`Buscar em ${id}...`}
                className="pl-12 h-12 rounded-xl border-2"
              />
            </div>

            <Select defaultValue="popular">
              <SelectTrigger className="w-48 h-12 rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Mais Vendidos</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6">
          {mockProducts.map((product) => {
            const stockBadge = getStockBadge(product.stock);
            return (
              <div
                key={product.id}
                className="bg-card rounded-2xl border border-border shadow-elegant hover:shadow-float smooth-transition p-4"
              >
                <div className="relative aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {stockBadge && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${stockBadge.class}`}>
                      {stockBadge.text}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1 min-h-[2.5rem]">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-3">
                  R$ {product.price.toFixed(2)}
                </p>
                <Button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  disabled={product.stock === 0}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold disabled:opacity-50"
                >
                  {product.stock === 0 ? "Indisponível" : "+ Adicionar"}
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Category;
