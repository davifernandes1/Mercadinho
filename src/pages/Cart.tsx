import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-6 shadow-elegant">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl font-bold text-primary">Meu Carrinho</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/home")}
            className="ml-auto text-primary font-semibold"
          >
            Continuar Comprando
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground mb-6">
              Seu carrinho está vazio
            </p>
            <Button
              onClick={() => navigate("/home")}
              className="h-14 px-8 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
            >
              Começar a Comprar
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 bg-card rounded-2xl border border-border shadow-elegant"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-3xl font-bold text-primary mb-4">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <span className="text-2xl font-bold w-12 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 ml-auto text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                    <p className="text-3xl font-bold text-primary">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 shadow-float">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div>
                  <p className="text-lg text-muted-foreground mb-1">Total a Pagar</p>
                  <p className="text-4xl font-bold text-primary">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/checkout")}
                  className="h-16 px-12 text-xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Confirmar e ir para Pagamento
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
