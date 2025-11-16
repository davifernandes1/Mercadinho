import {
  X,
  // --- CORREÇÃO DEFINITIVA ---
  // Trocamos os ícones de números por ícones de ação
  // que já sabemos que existem no seu projeto.
  Search,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  // --- FIM DA CORREÇÃO ---
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const HelpModal = () => {
  const { isHelpModalOpen, setIsHelpModalOpen } = useCart();

  if (!isHelpModalOpen) return null;

  return (
    <>
      {/* Fundo Desfocado */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-glass z-40 animate-fade-in"
        onClick={() => setIsHelpModalOpen(false)}
      />

      {/* Conteúdo do Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative bg-card rounded-3xl border border-border shadow-float p-10 w-full max-w-lg animate-scale-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsHelpModalOpen(false)}
            className="absolute top-4 right-4 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          <h1 className="text-3xl font-bold text-primary mb-8 text-center">
            Como Comprar
          </h1>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {/* --- ÍCONE CORRIGIDO --- */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-primary " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Explore as Categorias</h3>
                <p className="text-muted-foreground">
                  Navegue pela tela inicial ou use a barra lateral para encontrar
                  suas categorias favoritas.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* --- ÍCONE CORRIGIDO --- */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5 text-primary " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Adicione ao Carrinho</h3>
                <p className="text-muted-foreground">
                  Clique em "+ Adicionar" nos produtos que deseja comprar. Eles
                  aparecerão no seu carrinho.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* --- ÍCONE CORRIGIDO --- */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-primary " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Revise seu Pedido</h3>
                <p className="text-muted-foreground">
                  Clique no carrinho (na barra lateral ou no canto inferior)
                  para revisar os itens e o valor total.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* --- ÍCONE CORRIGIDO --- */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-primary " />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pague com PIX</h3>
                <p className="text-muted-foreground">
                  Siga para o pagamento, escaneie o QR Code PIX e pronto! Sua
                  compra estará finalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};