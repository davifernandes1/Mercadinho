import { useState, useMemo, useEffect } from "react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCart } from "@/context/CartContext";
// --- 1. IMPORTAR FUNÇÕES DE DATA ---
import { parseISO, isToday, isWithinInterval, subDays, format } from "date-fns";
import { Order } from "@/lib/orders"; // Importar a interface
// --- FIM DA IMPORTAÇÃO ---

const AdminSales = () => {
  const { orders, fetchOrders } = useCart();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); 

  const filteredOrders = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);
    
    // --- 2. USAR parseISO DIRETAMENTE ---
    if (activeFilter === "today") {
      return orders.filter(order => isToday(parseISO(order.createdAt)));
    }
    
    if (activeFilter === "7days") {
      return orders.filter(order => 
        isWithinInterval(parseISO(order.createdAt), { start: sevenDaysAgo, end: now })
      );
    }
    return orders;
  }, [orders, activeFilter]);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />
      <main className="ml-20 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Histórico de Vendas</h1>
        
        <div className="flex gap-4 mb-6">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className="font-semibold h-12 px-6 rounded-xl"
          >
            Todos
          </Button>
          <Button 
            variant={activeFilter === 'today' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('today')}
            className="font-semibold h-12 px-6 rounded-xl"
          >
            Hoje
          </Button>
          <Button 
            variant={activeFilter === '7days' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('7days')}
            className="font-semibold h-12 px-6 rounded-xl"
          >
            Últimos 7 dias
          </Button>
        </div>

        <div className="bg-card rounded-2xl border-none shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 border-none">
                <TableHead>ID Pedido</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* --- 3. CORRIGIDO OS TIPOS 'any' --- */}
              {filteredOrders.map((order: Order) => (
                <TableRow key={order._id} className="border-b border-border/50">
                  <TableCell className="font-semibold">#{order._id.slice(-6)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(parseISO(order.createdAt), "dd/MM/yyyy 'às' HH:mm")}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.items.map((item) => `${item.quantity}x ${item.name_at_sale}`).join(', ')}
                  </TableCell>
                  <TableCell className="font-bold text-primary">R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-success/20 text-success">
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