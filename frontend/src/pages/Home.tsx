import { Search, Coffee, Sandwich, IceCream, Package, Apple, ShoppingBag, Loader2 } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";

// O array de categorias que estava no seu arquivo original
const categories = [
  { id: "bebidas", name: "Bebidas", icon: Coffee, color: "bg-blue-100 text-blue-600" },
  { id: "padaria", name: "Padaria", icon: Sandwich, color: "bg-orange-100 text-orange-600" },
  { id: "congelados", name: "Congelados", icon: IceCream, color: "bg-cyan-100 text-cyan-600" },
  { id: "limpeza", name: "Limpeza", icon: Package, color: "bg-green-100 text-green-600" },
  { id: "hortifruti", name: "Hortifruti", icon: Apple, color: "bg-lime-100 text-lime-600" },
  { id: "mercearia", name: "Mercearia", icon: ShoppingBag, color: "bg-amber-100 text-amber-600" },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/api/products`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  return response.json();
};

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart(); 

  const { 
    data: products, 
    isLoading 
  } = useQuery<Product[]>({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts
  });

  const maisVendidos = products?.slice(0, 5) ?? [];
  const promocoes = products?.filter(p => p.price < 10).slice(0, 5) ?? [];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar />
      <CartPanel />
      <FloatingCart />

      <main className="ml-20 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-primary whitespace-nowrap">
              Mercadinho
            </h1>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="O que você procura hoje?"
                className="pl-12 h-14 text-lg rounded-2xl border-2"
              />
            </div>
          </div>
        </header>

        <section className="mb-12">
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-elegant">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop"
              alt="Produtos Frescos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="ml-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Produtos Frescos
                </h2>
                <p className="text-xl text-white mb-6">
                  Qualidade e frescor todos os dias
                </p>
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

        {/* ===== CORREÇÃO AQUI ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Categorias</h2>
          <div className="grid grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group p-8 bg-card rounded-2xl border-2 border-border hover:border-primary smooth-transition shadow-elegant hover:shadow-float"
              >
                <div className={`w-20 h-20 rounded-2xl ${category.color} flex items-center justify-center mb-4 mx-auto`}>
                  <category.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary smooth-transition">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </section>
        {/* ===== FIM DA CORREÇÃO ===== */}


        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Mais Vendidos</h2>
          {isLoading ? ( 
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {maisVendidos.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border shadow-elegant p-4 hover:shadow-float smooth-transition"
                >
                  <div className="relative aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 min-h-[2.5rem]">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">R$ {product.price.toFixed(2)}</p>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    disabled={product.stock === 0}
                    onClick={() => addItem({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })}
                  >
                    {product.stock === 0 ? "Indisponível" : "+ Adicionar"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold text-primary mb-6">Promoções</h2>
          {isLoading ? (
             <div className="flex h-64 items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {promocoes.map((product) => (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border shadow-elegant p-4 hover:shadow-float smooth-transition relative"
                >
                  <div className="relative aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 min-h-[2.5rem]">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">R$ {product.price.toFixed(2)}</p>
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    disabled={product.stock === 0}
                     onClick={() => addItem({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })}
                  >
                    {product.stock === 0 ? "Indisponível" : "+ Adicionar"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;