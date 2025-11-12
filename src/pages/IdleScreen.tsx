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

      <div className="relative z-10 text-center px-8 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Mercadinho do Condomínio
        </h1>
        <p className="text-2xl text-white mb-12 drop-shadow-lg">
          Bem-vindo! Produtos frescos e de qualidade para você.
        </p>

        <Button
          onClick={() => navigate("/home")}
          className="h-20 px-12 text-2xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-float smooth-transition rounded-2xl"
        >
          Toque para Iniciar
        </Button>
      </div>
    </div>
  );
};

export default IdleScreen;
