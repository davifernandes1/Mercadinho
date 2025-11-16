import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";

export const FloatingCart = () => {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <Button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-8 right-8 h-auto py-4 px-6 bg-card border-2 border-border shadow-float hover:shadow-elegant smooth-transition z-20 rounded-2xl"
      variant="outline"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        </div>
        <div className="text-left">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-lg font-bold text-foreground">
            R$ {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </Button>
  );
};
