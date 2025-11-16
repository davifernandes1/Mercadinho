import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext"; // 1. IMPORTAR O CONTEXTO

const Payment = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("Aguardando confirmação do pagamento...");
  const [isProcessing, setIsProcessing] = useState(true);
  
  // 2. PEGAR A FUNÇÃO DE PAGAMENTO
  const { processPayment } = useCart();

  useEffect(() => {
    // 3. PROCESSAR O PAGAMENTO AO ENTRAR NA TELA
    const process = async () => {
      // Simula o tempo de leitura do QR Code
      await new Promise(resolve => setTimeout(resolve, 5000)); 
      
      const { success, message } = await processPayment(); // Chama a API
      
      if (success) {
        setIsProcessing(false);
        setStatusMessage("Pagamento confirmado!");
        toast.success(message);
        setTimeout(() => {
          navigate("/success");
        }, 3000); // Vai para a tela de sucesso
      } else {
        // Falha (ex: estoque)
        setIsProcessing(false);
        setStatusMessage("Falha no pagamento!");
        toast.error(message); // Mostra o erro (ex: "Estoque insuficiente...")
        setTimeout(() => {
          navigate("/cart"); // Manda de volta para o carrinho
        }, 3000);
      }
    };

    process();
  }, [navigate, processPayment]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126...");
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        {/* ... (QR Code e botão de Copiar Chave mantidos) ... */}
        
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          {isProcessing && <Loader2 className="w-6 h-6 animate-spin" />}
          <p className="text-lg">
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;