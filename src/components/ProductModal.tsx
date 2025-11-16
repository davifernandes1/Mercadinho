// Caminho: src/components/ProductModal.tsx

import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react"; // Adicionado useEffect
import { Product } from "@/lib/products"; // Importando a interface

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Reseta a quantidade para 1 toda vez que o modal/produto mudar
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose(); // Fecha o modal
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-glass z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* --- LAYOUT CORRIGIDO --- */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        {/* Aumentei o tamanho máximo e removi o padding principal */}
        <div className="relative bg-card rounded-3xl border border-border shadow-float w-full max-w-2xl animate-scale-in overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Container Flex (vertical no celular, horizontal no desktop) */}
          <div className="flex flex-col md:flex-row">
            {/* Imagem (ocupa metade no desktop) */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-1/2 h-64 md:h-96 object-cover flex-shrink-0"
            />
            
            {/* Conteúdo (ocupa outra metade e tem seu próprio padding) */}
            <div className="p-8 flex flex-col flex-1">
              <h1 className="text-3xl font-bold text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-foreground mb-4">
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground mb-6 text-sm">
                {product.description || "Este produto não possui descrição."}
              </p>

              {/* Empurra os botões para baixo */}
              <div className="mt-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-lg font-semibold">Quantidade:</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity === 1}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  {product.stock === 0 ? "Indisponível" : "Adicionar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};