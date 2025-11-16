import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/products";
import { X } from "lucide-react";
// --- 1. IMPORTAR COMPONENTES DE SELECT E CATEGORIAS ---
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/categories";
// --- FIM DO IMPORT ---

type ProductFormData = Omit<Product, "id">;

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductFormData) => void;
  product: Product | null;
}

const emptyProduct: ProductFormData = {
  name: "",
  category: categories[0]?.id || "", // Garante um valor padrão
  price: 0,
  stock: 0,
  image: "",
  description: ""
};

export const ProductEditModal = ({ isOpen, onClose, onSave, product }: ProductEditModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(emptyProduct);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };
  
  // --- 2. HANDLER PARA O SELECT ---
  const handleCategoryChange = (value: string) => {
     setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  }
  // --- FIM DO HANDLER ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              
              {/* --- 3. SUBSTITUIÇÃO DO INPUT PELO SELECT --- */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* --- FIM DA SUBSTITUIÇÃO --- */}

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