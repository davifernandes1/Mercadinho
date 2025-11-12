import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setTimeout(() => {
        navigate("/success");
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff6b2e6125204000053039865802BR5913Loja Digital6009SAO PAULO62070503***63041D3D");
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 animate-slide-in-right">
      <div className="max-w-2xl w-full text-center animate-scale-in">
        <h1 className="text-4xl font-bold text-primary mb-4">Pague com PIX</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Escaneie o QR Code ou copie a chave
        </p>

        <div className="bg-card rounded-3xl border-2 border-border shadow-float p-12 mb-8">
          <div className="w-80 h-80 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="w-64 h-64 bg-white p-4 rounded-xl">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="white"/>
                  <path d="M10,10 h15 v15 h-15 z M30,10 h5 v5 h-5 z M40,10 h5 v5 h-5 z M50,10 h5 v5 h-5 z M65,10 h15 v15 h-15 z" fill="black"/>
                  <path d="M12,12 h11 v11 h-11 z M67,12 h11 v11 h-11 z" fill="white"/>
                  <path d="M10,30 h5 v5 h-5 z M20,30 h10 v5 h-10 z M35,30 h10 v5 h-10 z M50,30 h5 v5 h-5 z M60,30 h5 v5 h-5 z M70,30 h10 v5 h-10 z" fill="black"/>
                  <path d="M10,40 h5 v5 h-5 z M25,40 h5 v5 h-5 z M35,40 h15 v5 h-15 z M55,40 h10 v5 h-10 z M70,40 h5 v5 h-5 z" fill="black"/>
                  <path d="M10,50 h5 v5 h-5 z M20,50 h5 v5 h-5 z M30,50 h10 v5 h-10 z M45,50 h10 v5 h-10 z M60,50 h15 v5 h-15 z" fill="black"/>
                  <path d="M10,65 h15 v15 h-15 z M30,65 h10 v5 h-10 z M45,65 h5 v5 h-5 z M55,65 h10 v5 h-10 z M70,65 h5 v5 h-5 z" fill="black"/>
                  <path d="M12,67 h11 v11 h-11 z" fill="white"/>
                  <path d="M30,75 h5 v5 h-5 z M40,75 h15 v5 h-15 z M60,75 h10 v5 h-10 z M75,75 h5 v5 h-5 z" fill="black"/>
                </svg>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCopyPix}
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-2"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copiar Chave PIX
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-lg">
            {isProcessing ? "Aguardando confirmação do pagamento..." : "Pagamento confirmado!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
