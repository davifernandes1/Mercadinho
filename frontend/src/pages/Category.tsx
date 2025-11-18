import { useState, useEffect } from "react"; 
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";

interface Product {
  _id: string; 
  name: string;
  price: number;
  image: string;
  stock: number;
}

const fetchProductsByCategory = async (category: string, search: string, sort: string): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (sort) params.append("sort", sort);

  const response = await fetch(`http://localhost:3001/api/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Não foi possível buscar os produtos.');
  }
  return response.json();
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const Category = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const { addItem } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: products, isLoading, isError, isFetching } = useQuery<Product[]>({
    queryKey: ['products', id, debouncedSearch, sortOption], 
    queryFn: () => fetchProductsByCategory(id!, debouncedSearch, sortOption),
    staleTime: 5000, 
    placeholderData: (previousData) => previousData 
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive text-destructive-foreground" };
    if (stock < 5) return { text: "Poucas unidades!", class: "bg-warning text-warning-foreground" };
    return null;
  };

  if (isLoading && !products) {
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
              {isFetching ? (
                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 animate-spin" />
              ) : (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              )}
              <Input
                placeholder={`Buscar em ${id}...`}
                className="pl-12 h-12 rounded-xl border-2 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-48 h-12 rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Relevância</SelectItem>
                <SelectItem value="price-asc">Menor Preço</SelectItem>
                <SelectItem value="price-desc">Maior Preço</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6">
          {products?.length === 0 && (
             <p className="col-span-4 text-center text-muted-foreground py-10">Nenhum produto encontrado.</p>
          )}
          {products?.map((product) => {
            const stockBadge = getStockBadge(product.stock);
            return (
              <div
                key={product._id} 
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
                      stock: product.stock,
                      category: id || "geral"
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