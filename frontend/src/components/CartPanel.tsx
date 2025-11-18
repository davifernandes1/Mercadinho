import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const CartPanel = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col border-l border-border animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold text-primary">Seu Carrinho</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-background rounded-xl border border-border shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-muted"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                      <p className="text-primary font-bold">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border p-6 bg-card">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-foreground">Subtotal:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={() => {
              setIsCartOpen(false);
              navigate("/cart");
            }}
            className="w-full h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md"
            disabled={items.length === 0}
          >
            Ir para o Pagamento
          </Button>
        </div>
      </div>
    </>
  );
};