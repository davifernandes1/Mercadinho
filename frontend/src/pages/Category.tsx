import { ArrowLeft, Search, Plus } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { FloatingCart } from "@/components/FloatingCart";
import { CartPanel } from "@/components/CartPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { HelpModal } from "@/components/HelpModal";
import { useState, useMemo } from "react";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext"; 

const Category = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const { products, addItem } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");

  // --- CORREÇÃO DO FILTRO 'any' (image_ff006a.png) ---
  const baseProducts = useMemo(() => {
    return products.filter(p => {
      // Checa se p.category é uma string (ID) ou um objeto (populado)
      const catId = typeof p.category === 'string' ? p.category : p.category.id;
      return catId === categoryId;
    });
  }, [categoryId, products]); 
  // --- FIM DA CORREÇÃO ---

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = baseProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const sorted = [...filtered];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [baseProducts, searchTerm, sortOption]);

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
      <HelpModal />

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
            <h1 className="text-4xl font-bold text-primary capitalize">{categoryId}</h1>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder={`Buscar em ${categoryId}...`}
                className="pl-12 h-12 rounded-xl border-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
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
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => {
              const stockBadge = getStockBadge(product.stock);
              return (
                <div key={product.id} className="bg-card rounded-2xl border border-border shadow-elegant hover:shadow-float smooth-transition p-4 flex flex-col">
                  <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
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
                  </div>
                  <Button
                    onClick={() => addItem(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold disabled:opacity-50 mt-auto"
                  >
                    <Plus className="w-5 h-5" />
                    {product.stock === 0 ? "Indisponível" : "Adicionar"}
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="col-span-4 text-center text-muted-foreground">
              {searchTerm
                ? "Nenhum produto encontrado para sua busca."
                : "Nenhum produto encontrado nesta categoria."}
            </p>
          )}
        </div>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Category;