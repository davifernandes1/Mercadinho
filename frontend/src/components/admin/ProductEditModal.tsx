import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/products";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// --- 1. IMPORTAR useCart PARA PEGAR AS CATEGORIAS ---
import { useCart } from "@/context/CartContext";

// O tipo de dado do formulário
// A categoria no formulário é SEMPRE um 'string' (ID)
type ProductFormData = Omit<Product, "id" | "_id" | "image_url" | "category"> & {
  category: string;
};

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  // O onSave agora espera o formData com 'category' como string
  onSave: (product: ProductFormData) => void;
  product: Product | null;
}

export const ProductEditModal = ({ isOpen, onClose, onSave, product }: ProductEditModalProps) => {
  // --- 2. PEGAR CATEGORIAS DO CONTEXTO ---
  const { categories } = useCart();
  
  // Define o produto vazio
  const emptyProduct: ProductFormData = {
    name: "",
    category: categories[0]?.id || "", // Pega o ID da primeira categoria
    price: 0,
    stock: 0,
    image: "",
    description: ""
  };
  
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);

  // --- 3. useEffect ATUALIZADO ---
  useEffect(() => {
    if (product) {
      // Se o produto for passado, extrai os dados para o formulário
      setFormData({
        name: product.name,
        // Extrai o ID da categoria, seja ela string ou objeto
        category: typeof product.category === 'string' ? product.category : product.category.id,
        price: product.price,
        stock: product.stock,
        image: product.image,
        description: product.description || ""
      });
    } else {
      // Garante que o 'emptyProduct' tenha a categoria padrão mais recente
      setFormData({
        ...emptyProduct,
        category: categories[0]?.id || ""
      });
    }
  }, [product, isOpen, categories]); // Adiciona 'categories' como dependência

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // O formData já está no formato correto (category: string)
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo Desfocado */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-glass z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Conteúdo do Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative bg-card rounded-3xl border border-border shadow-float p-8 w-full max-w-lg animate-scale-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {product ? "Editar Produto" : "Novo Produto"}
              </h2>
            </div>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" value={formData.name} onChange={handleChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                {/* --- 4. CORREÇÃO DO ERRO --- */}
                {/* O 'value' agora é 'formData.category', que garantimos ser uma string */}
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Mapeia as categorias do 'useCart()' */}
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input id="stock" type="number" value={formData.stock} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem</Label>
                <Input id="image" value={formData.image} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" value={formData.description || ""} onChange={handleChange} />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose} className="h-12 px-6 text-base">Cancelar</Button>
              <Button type="submit" className="bg-success hover:bg-success/90 text-success-foreground h-12 px-6 text-base">Salvar Produto</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};