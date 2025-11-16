import { ArrowLeft, Search, Loader2 } from "lucide-react"; // 1. Importar Loader2
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query"; // 2. Importar useQuery

// 3. Definir a interface do Produto (O MESMO QUE O HOME.TSX)
interface Product {
  _id: string; 
  name: string;
  price: number;
  image: string; // <-- A correção está aqui
  stock: number;
}

// 4. Função que busca produtos PELA CATEGORIA
const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await fetch(`http://localhost:3001/api/products?category=${category}`);
  if (!response.ok) {
    throw new Error('Não foi possível buscar os produtos.');
  }
  return response.json();
};

// 5. REMOVA O ARRAY 'mockProducts' DAQUI

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const { addItem } = useCart();

  // 6. Usar o useQuery para buscar os dados
  const { 
    data: products, 
    isLoading, 
    isError 
  } = useQuery<Product[]>({
    queryKey: ['products', id], 
    queryFn: () => fetchProductsByCategory(id!)
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive text-destructive-foreground" };
    if (stock < 5) return { text: "Poucas unidades!", class: "bg-warning text-warning-foreground" };
    return null;
  };

  // 7. Adicionar estados de carregamento e erro
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ml-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground ml-4">Carregando produtos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center ml-20">
        <p className="text-xl text-destructive">Erro ao carregar produtos.</p>
      </div>
    );
  }

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
          {/* 8. Mapear os dados vindos do useQuery */}
          {products?.map((product) => {
            const stockBadge = getStockBadge(product.stock);
            return (
              <div
                key={product._id} // Mudar para _id
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
                      id: product._id, 
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