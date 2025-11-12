import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroMarket from "@/assets/hero-market.jpg";

const IdleScreen = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);

  const handleCornerClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5) {
      navigate("/admin/login");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroMarket})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <button
        onClick={handleCornerClick}
        className="absolute top-0 left-0 w-20 h-20 z-10 cursor-default"
        aria-label="Admin access"
      />

      <div className="relative z-10 text-center px-8 animate-scale-in">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          Mercadinho do Condomínio
        </h1>
        <p className="text-2xl text-white mb-12 drop-shadow-2xl">
          Bem-vindo! Produtos frescos e de qualidade para você.
        </p>

        <Button
          onClick={() => navigate("/home")}
          className="h-20 px-12 text-2xl font-bold bg-white text-primary hover:bg-white/90 shadow-float hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-300 rounded-2xl hover:scale-105"
        >
          Toque para Iniciar
        </Button>
      </div>
    </div>
  );
};

export default IdleScreen;
