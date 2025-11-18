//
import React, { useState, useEffect } from "react";
import { Edit, Trash2, Loader2, Plus, Search } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { categories } from "@/lib/categories";

// --- TIPOS E SCHEMAS ---
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
}

const productSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  category: z.string().min(1, "Selecione uma categoria"),
  price: z.coerce.number().min(0.01, "Preço inválido"),
  stock: z.coerce.number().min(0, "Estoque inválido"),
  image: z.string().optional().or(z.literal('')),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const API_URL = "http://localhost:3001/api/products";

// --- FUNÇÕES DE API ---
const fetchProducts = async (category: string, search: string): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (category && category !== "all") params.append("category", category);
  if (search) params.append("search", search);

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  return response.json();
};

const createProductApi = async (data: ProductFormData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar");
  return res.json();
};

const updateProductApi = async ({ id, data }: { id: string; data: ProductFormData }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar");
  return res.json();
};

const deleteProductApi = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar");
  return res.json();
};

// --- COMPONENTE DE MODAL DE FORMULÁRIO ---
interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const ProductFormDialog = ({ isOpen, onClose, productToEdit }: ProductFormDialogProps) => {
  const queryClient = useQueryClient();
  const isEdit = !!productToEdit;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "", category: "", price: 0, stock: 0, image: "", description: ""
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        reset({
          name: productToEdit.name,
          // --- CORREÇÃO ABAIXO: Removemos o 'as any' e usamos tipagem segura ---
          category: typeof productToEdit.category === 'string' 
            ? productToEdit.category 
            : (productToEdit.category as { _id: string })._id || "", 
          // --------------------------------------------------------------------
          price: productToEdit.price,
          stock: productToEdit.stock,
          image: productToEdit.image || "",
          description: productToEdit.description || ""
        });
      } else {
        reset({ name: "", category: "", price: 0, stock: 0, image: "", description: "" });
      }
    }
  }, [isOpen, productToEdit, reset]);

  const createMutation = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success("Produto criado!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      onClose();
    },
    onError: () => toast.error("Erro ao criar produto.")
  });

  const updateMutation = useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      toast.success("Produto atualizado!");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      onClose();
    },
    onError: () => toast.error("Erro ao atualizar produto.")
  });

  const onSubmit = (data: ProductFormData) => {
    if (isEdit && productToEdit) {
      updateMutation.mutate({ id: productToEdit._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const categoryValue = watch("category");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            {isEdit ? <Edit className="w-6 h-6"/> : <Plus className="w-6 h-6"/>}
            {isEdit ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" {...register("name")} className="h-12 bg-muted/30" placeholder="Ex: Coca-Cola 2L" />
              {errors.name && <span className="text-destructive text-sm">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select 
                value={categoryValue} 
                onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
              >
                <SelectTrigger className="h-12 bg-muted/30">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <span className="text-destructive text-sm">{errors.category.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" type="number" step="0.01" {...register("price")} className="h-12 bg-muted/30" />
                {errors.price && <span className="text-destructive text-sm">{errors.price.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque (Un)</Label>
                <Input id="stock" type="number" {...register("stock")} className="h-12 bg-muted/30" />
                {errors.stock && <span className="text-destructive text-sm">{errors.stock.message}</span>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem</Label>
              <Input id="image" {...register("image")} className="h-12 bg-muted/30" placeholder="https://..." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="description">Descrição (Opcional)</Label>
              <Input id="description" {...register("description")} className="h-12 bg-muted/30" />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="h-12">Cancelar</Button>
            <Button type="submit" className="h-12 bg-success hover:bg-success/90 text-white font-bold px-8" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- PÁGINA PRINCIPAL ---
const AdminProducts = () => {
  const queryClient = useQueryClient();
  
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["adminProducts", categoryFilter, search],
    queryFn: () => fetchProducts(categoryFilter, search),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Produto excluído.");
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      setDeleteId(null);
    }
  });

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary">Gerenciar Produtos</h1>
            <Button onClick={handleCreate} className="h-12 px-6 bg-primary hover:bg-primary/90 text-lg shadow-lg hover:scale-105 transition-all">
              <Plus className="w-5 h-5 mr-2" /> Novo Produto
            </Button>
          </div>

          <div className="flex gap-4 bg-card p-4 rounded-2xl shadow-sm border border-border/50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Pesquisar por nome..." 
                className="pl-10 h-12 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px] h-12 text-lg">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-card rounded-2xl border-none shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="py-4 pl-6">Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : products?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                products?.map((product) => (
                  <TableRow key={product._id} className="hover:bg-muted/10 transition-colors border-b border-border/50">
                    <TableCell className="font-semibold pl-6 py-4 text-lg">{product.name}</TableCell>
                    <TableCell className="capitalize text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="font-bold text-primary">R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {product.stock} un
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="mr-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Edit className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(product._id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      <ProductFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        productToEdit={productToEdit} 
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. O produto será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? <Loader2 className="animate-spin"/> : "Sim, excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;