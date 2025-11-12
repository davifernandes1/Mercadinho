import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background animate-slide-in-right">
      <header className="bg-card border-b border-border p-6 shadow-elegant">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cart")}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl font-bold text-primary">Revise seu Pedido</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <div className="space-y-4 mb-32">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-6 bg-card rounded-2xl border border-border shadow-elegant"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {item.name}
                </h3>
                <p className="text-muted-foreground">
                  Quantidade: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 shadow-float">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-lg text-muted-foreground mb-1">Total</p>
                <p className="text-4xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/cart")}
                className="flex-1 h-14 text-lg font-semibold"
              >
                Voltar ao Carrinho
              </Button>
              <Button
                onClick={() => navigate("/payment")}
                className="flex-1 h-14 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Pagar R$ {totalPrice.toFixed(2)} com PIX
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
