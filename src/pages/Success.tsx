import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

const Success = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 animate-fade-in">
      <div className="text-center max-w-2xl animate-scale-in">
        <div className="w-32 h-32 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8">
          <svg className="w-16 h-16" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="3"
              className="animate-scale-in"
            />
            <path
              d="M15 25 L22 32 L35 18"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              className="animate-draw-check"
              style={{ animationDelay: "0.2s" }}
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-primary mb-4">
          Compra Finalizada com Sucesso!
        </h1>

        <p className="text-2xl text-muted-foreground mb-8">
          Obrigado por comprar conosco.
        </p>

        <p className="text-xl text-primary font-semibold">
          Volte sempre!
        </p>

        <p className="text-lg text-muted-foreground mt-12">
          Retornando à tela inicial em instantes...
        </p>
      </div>
    </div>
  );
};

export default Success;
