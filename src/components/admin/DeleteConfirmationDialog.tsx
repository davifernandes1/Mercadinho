import { Button } from "@/components/ui/button";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, productName }: DeleteConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo Desfocado */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-glass z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Conteúdo do Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative bg-card rounded-3xl border border-border shadow-float p-8 w-full max-w-lg animate-scale-in">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Você tem certeza?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente o produto: <strong className="text-foreground">{productName}</strong>.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 px-6 text-base"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="h-12 px-6 text-base mb-2 sm:mb-0"
            >
              Sim, deletar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}