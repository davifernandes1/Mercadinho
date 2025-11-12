import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center animate-scale-in">
        <div className="mb-8 inline-block">
          <CheckCircle2 className="w-32 h-32 text-success animate-scale-in" />
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
