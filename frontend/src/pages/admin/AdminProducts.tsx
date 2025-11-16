import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/lib/products";
import { ProductEditModal } from "@/components/admin/ProductEditModal";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext"; 

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useCart();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSaveProduct = async (formData: Omit<Product, "id" | "_id" | "image_url" | "category"> & { category: string }) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      await addProduct(formData);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    await deleteProduct(selectedProduct.id);
    toast.success(`Produto "${selectedProduct.name}" deletado.`);
    setIsAlertOpen(false);
    setSelectedProduct(null);
  };

  const openNewModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openDeleteAlert = (product: Product) => {
    setSelectedProduct(product);
    setIsAlertOpen(true);
  };

  // --- CORREÇÃO DO FILTRO (image_ff0c63.png) ---
  const filteredProducts = products.filter(p => {
    // Verifica se a categoria é string (ID) ou um objeto (populado)
    const categoryName = typeof p.category === 'string' ? p.category : p.category.name;
    
    return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (categoryName && categoryName.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  // --- FIM DA CORREÇÃO ---
  
  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive/20 text-destructive" };
    if (stock < 5) return { text: `${stock} unidades`, class: "bg-warning/20 text-warning" };
    return { text: `${stock} unidades`, class: "bg-success/20 text-success" };
  };

  return (
    <>
      <div className="min-h-screen bg-background animate-fade-in">
        <CustomerSidebar isAdmin />

        <main className="ml-20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-primary">Gerenciar Produtos</h1>
            <Button
              onClick={openNewModal}
              className="bg-success hover:bg-success/90 text-success-foreground font-semibold h-14 px-8 text-lg rounded-xl shadow-elegant"
            >
              + Novo Produto
            </Button>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Buscar produtos ou categorias..."
              className="max-w-md h-14 text-lg rounded-xl border-2 shadow-elegant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-card rounded-2xl border-none shadow-elegant overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-none">
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockBadge = getStockBadge(product.stock);
                  return (
                    <TableRow key={product.id} className="border-b border-border/50">
                      <TableCell className="font-semibold">{product.name}</TableCell>
                      
                      {/* --- CORREÇÃO DA RENDERIZAÇÃO (image_ff0c67.png) --- */}
                      <TableCell className="capitalize text-muted-foreground">
                        {typeof product.category === 'string' ? product.category : product.category.name}
                      </TableCell>
                      {/* --- FIM DA CORREÇÃO --- */}
                      
                      <TableCell className="font-bold text-primary">R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${stockBadge.class}`}>
                          {getStockBadge(product.stock).text}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEditModal(product)}>
                          <Edit className="w-5 h-5 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteAlert(product)}>
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
      </div>
      
      {/* Modais */}
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
      {selectedProduct && (
        <DeleteConfirmationDialog
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleDeleteProduct}
          productName={selectedProduct.name}
        />
      )}
    </>
  );
};

export default AdminProducts;