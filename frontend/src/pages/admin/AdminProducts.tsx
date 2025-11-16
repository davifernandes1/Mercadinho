import React, { useState, useEffect } from "react";
import { Edit, Trash2, Loader2, Plus, X, AlertCircle } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Usando o sonner que você já tem
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Interface do Produto (do MongoDB)
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

// 1. Esquema de Validação com Zod
const productSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  price: z.coerce.number().min(0.01, "O preço deve ser positivo"),
  stock: z.coerce.number().min(0, "O estoque não pode ser negativo"),
  image: z.string().url("A imagem deve ser uma URL válida").optional().or(z.literal('')),
});

// Tipo do formulário inferido do Zod
type ProductFormData = z.infer<typeof productSchema>;

// URL base da API
const API_URL = "http://localhost:3001/api/products";

// 2. Funções da API
const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  return response.json();
};

const createProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao criar produto");
  return response.json();
};

const updateProduct = async (data: ProductFormData & { _id: string }): Promise<Product> => {
  const { _id, ...updateData } = data;
  const response = await fetch(`${API_URL}/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) throw new Error("Erro ao atualizar produto");
  return response.json();
};

const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir produto");
  return response.json();
};

// ===================================================
// Componente do Formulário (Modal)
// ===================================================
interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null; // Se 'product' for passado, é modo de edição
}

const categories = ["bebidas", "padaria", "congelados", "limpeza", "hortifruti", "mercearia"];

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, product }) => {
  const queryClient = useQueryClient();
  const isEditMode = !!product;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Carrega os dados do produto no formulário quando o modal abre em modo de edição
  useEffect(() => {
    if (isEditMode) {
      reset(product);
    } else {
      reset({ name: "", category: "", price: 0, stock: 0, image: "" });
    }
  }, [isOpen, product, reset, isEditMode]);

  // Mutações para Criar e Atualizar
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      onClose();
    },
    onError: (err) => {
      toast.error(`Falha ao criar: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      onClose();
    },
    onError: (err) => {
      toast.error(`Falha ao atualizar: ${err.message}`);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    if (isEditMode) {
      updateMutation.mutate({ ...data, _id: product._id });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {isEditMode ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          {/* Nome */}
          <div>
            <Label htmlFor="name" className="font-semibold">Nome do Produto</Label>
            <Input id="name" {...register("name")} className="mt-2 h-12" />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          {/* Categoria */}
          <div>
            <Label htmlFor="category" className="font-semibold">Categoria</Label>
            <Select onValueChange={(value) => reset({ ...control._formValues, category: value })} value={control._formValues.category}>
              <SelectTrigger id="category" className="mt-2 h-12">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Preço */}
            <div>
              <Label htmlFor="price" className="font-semibold">Preço (R$)</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} className="mt-2 h-12" />
              {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
            </div>
            {/* Estoque */}
            <div>
              <Label htmlFor="stock" className="font-semibold">Estoque (Un)</Label>
              <Input id="stock" type="number" {...register("stock")} className="mt-2 h-12" />
              {errors.stock && <p className="text-sm text-destructive mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Imagem URL */}
          <div>
            <Label htmlFor="image" className="font-semibold">URL da Imagem (Opcional)</Label>
            <Input id="image" {...register("image")} className="mt-2 h-12" placeholder="https://..." />
            {errors.image && <p className="text-sm text-destructive mt-1">{errors.image.message}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" className="h-12 px-6 font-bold" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Salvar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ===================================================
// Componente de Confirmação de Exclusão
// ===================================================
interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  isLoading: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, productName, isLoading }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            Tem certeza?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Isso excluirá permanentemente o produto: <strong className="text-foreground">{productName}</strong>. Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading} className="bg-destructive hover:bg-destructive/90">
            {isLoading ? <Loader2 className="animate-spin" /> : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ===================================================
// Componente Principal da Página
// ===================================================
const AdminProducts = () => {
  const queryClient = useQueryClient();
  
  // Estados de controle dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Busca de dados (READ)
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts
  });

  // Mutação para Excluir (DELETE)
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Produto excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      setIsDeleteAlertOpen(false);
      setProductToDelete(null);
    },
    onError: (err) => {
      toast.error(`Falha ao excluir: ${err.message}`);
    },
  });

  // Handlers para abrir modais
  const handleOpenNewModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenDeleteAlert = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteMutation.mutate(productToDelete._id);
    }
  };

  // Funções de UI
  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive/20 text-destructive" };
    if (stock < 5) return { text: `${stock} unidades`, class: "bg-warning/20 text-warning" };
    return { text: `${stock} unidades`, class: "bg-success/20 text-success" };
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ml-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground ml-4">Carregando produtos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center ml-20">
        <p className="text-xl text-destructive">Erro ao carregar produtos.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Gerenciar Produtos</h1>
          <Button 
            onClick={handleOpenNewModal} // <-- Conectado
            className="bg-success hover:bg-success/90 text-success-foreground font-semibold h-14 px-8 text-lg rounded-xl shadow-elegant hover:shadow-float hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-6 h-6 mr-2" /> Novo Produto
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Buscar produtos..."
            className="max-w-md h-14 text-lg rounded-xl border-2 shadow-elegant focus:shadow-float transition-all duration-300"
          />
        </div>

        <div className="bg-card rounded-2xl border-none shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-none">
                <TableHead className="font-bold text-foreground py-4">Produto</TableHead>
                <TableHead className="font-bold text-foreground py-4">Categoria</TableHead>
                <TableHead className="font-bold text-foreground py-4">Preço</TableHead>
                <TableHead className="font-bold text-foreground py-4">Estoque</TableHead>
                <TableHead className="font-bold text-foreground py-4 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product, index) => {
                const stockBadge = getStockBadge(product.stock);
                return (
                  <TableRow 
                    key={product._id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-semibold text-foreground py-6">{product.name}</TableCell>
                    <TableCell className="capitalize text-muted-foreground py-6">{product.category}</TableCell>
                    <TableCell className="font-bold text-primary text-lg py-6">
                      R$ {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-6">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold ${stockBadge.class} shadow-sm`}>
                        {stockBadge.text}
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-right py-6">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-primary/10 hover:scale-110 transition-all duration-200 mr-2"
                        onClick={() => handleOpenEditModal(product)} // <-- Conectado
                      >
                        <Edit className="w-5 h-5 text-primary" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-destructive/10 hover:scale-110 transition-all duration-200"
                        onClick={() => handleOpenDeleteAlert(product)} // <-- Conectado
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Renderiza os modais (controlados pelos estados) */}
      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
      
      {productToDelete && (
        <DeleteConfirmationDialog 
          isOpen={isDeleteAlertOpen}
          onClose={() => setIsDeleteAlertOpen(false)}
          onConfirm={handleConfirmDelete}
          productName={productToDelete.name}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default AdminProducts;