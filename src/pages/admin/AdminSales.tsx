import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
  { id: "001", datetime: "12/11/2025 14:32", items: "Coca-Cola 2L, Pão Francês x3", total: 10.49, status: "Pago" },
  { id: "002", datetime: "12/11/2025 13:15", items: "Arroz 5kg, Feijão 1kg", total: 35.40, status: "Pago" },
  { id: "003", datetime: "12/11/2025 12:08", items: "Leite Integral, Café 500g", total: 18.90, status: "Pago" },
  { id: "004", datetime: "12/11/2025 11:45", items: "Refrigerante x2, Salgadinho", total: 14.97, status: "Pago" },
];

const AdminSales = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Histórico de Vendas</h1>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="font-semibold h-12 px-6 rounded-xl hover:bg-primary/10 hover:border-primary transition-all duration-200">
            Hoje
          </Button>
          <Button variant="outline" className="font-semibold h-12 px-6 rounded-xl hover:bg-primary/10 hover:border-primary transition-all duration-200">
            Últimos 7 dias
          </Button>
          <Button variant="outline" className="font-semibold h-12 px-6 rounded-xl hover:bg-primary/10 hover:border-primary transition-all duration-200">
            Escolher período
          </Button>
        </div>

        <div className="bg-card rounded-2xl border-none shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-none">
                <TableHead className="font-bold text-foreground py-4">ID do Pedido</TableHead>
                <TableHead className="font-bold text-foreground py-4">Data/Hora</TableHead>
                <TableHead className="font-bold text-foreground py-4">Itens</TableHead>
                <TableHead className="font-bold text-foreground py-4">Valor Total</TableHead>
                <TableHead className="font-bold text-foreground py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow 
                  key={order.id}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TableCell className="font-semibold text-foreground py-6">#{order.id}</TableCell>
                  <TableCell className="text-muted-foreground py-6">{order.datetime}</TableCell>
                  <TableCell className="text-muted-foreground py-6">{order.items}</TableCell>
                  <TableCell className="font-bold text-primary text-lg py-6">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-success/20 text-success shadow-sm">
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminSales;
