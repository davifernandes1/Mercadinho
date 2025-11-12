import { Edit, Trash2 } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const products = [
  { id: "1", name: "Coca-Cola 2L", category: "bebidas", price: 8.99, stock: 25 },
  { id: "2", name: "Guaraná Antarctica 2L", category: "bebidas", price: 7.99, stock: 3 },
  { id: "3", name: "Suco Del Valle 1L", category: "bebidas", price: 6.50, stock: 0 },
  { id: "4", name: "Água Mineral 500ml", category: "bebidas", price: 2.50, stock: 50 },
  { id: "5", name: "Energético Red Bull", category: "bebidas", price: 9.99, stock: 8 },
];

const AdminProducts = () => {
  const getStockBadge = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", class: "bg-destructive/20 text-destructive" };
    if (stock < 5) return { text: `${stock} unidades`, class: "bg-warning/20 text-warning" };
    return { text: `${stock} unidades`, class: "bg-success/20 text-success" };
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Gerenciar Produtos</h1>
          <Button className="bg-success hover:bg-success/90 text-success-foreground font-semibold h-14 px-8 text-lg rounded-xl shadow-elegant hover:shadow-float hover:scale-105 transition-all duration-300">
            + Novo Produto
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
              {products.map((product, index) => {
                const stockBadge = getStockBadge(product.stock);
                return (
                  <TableRow 
                    key={product.id}
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
                      >
                        <Edit className="w-5 h-5 text-primary" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-destructive/10 hover:scale-110 transition-all duration-200"
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
    </div>
  );
};

export default AdminProducts;
