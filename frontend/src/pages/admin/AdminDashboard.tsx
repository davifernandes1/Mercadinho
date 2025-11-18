//
import { useEffect, useMemo } from "react";
import { Package, AlertTriangle, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { isToday, subDays, format, parseISO, isWithinInterval } from "date-fns";

const AdminDashboard = () => {
  // Usar dados reais do contexto
  const { products, orders, fetchOrders } = useCart();

  // Garantir que temos os pedidos mais recentes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Cálculos baseados em dados reais
  const stats = useMemo(() => {
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10);
    const outOfStock = products.filter(p => p.stock === 0);
    
    // Vendas de hoje
    const todayOrders = orders.filter(o => isToday(parseISO(o.createdAt)));
    const todayRevenue = todayOrders.reduce((acc, curr) => acc + curr.total, 0);

    // Produtos "encalhados" (simplificação: produtos sem stock vendido recentemente seria complexo sem histórico de itens, 
    // mas podemos listar produtos com muito stock que não aparecem nos pedidos recentes)
    // Por simplicidade, vamos listar produtos com muito stock (>50)
    const slowMoving = products.filter(p => p.stock > 50);

    // Gráfico de vendas (últimos 7 dias)
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i); // De 6 dias atrás até hoje
      const dayOrders = orders.filter(o => {
         const orderDate = parseISO(o.createdAt);
         return format(orderDate, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd');
      });
      return {
        day: format(d, 'EEE'), // Seg, Ter...
        value: dayOrders.reduce((acc, curr) => acc + curr.total, 0)
      };
    });

    return { lowStock, outOfStock, todayOrders, todayRevenue, slowMoving, last7Days };
  }, [products, orders]);

  const maxValue = Math.max(...stats.last7Days.map((d) => d.value), 1); // Evitar divisão por zero

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <CustomerSidebar isAdmin />

      <main className="ml-20 p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Dashboard Administrativo</h1>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-elegant hover:shadow-float transition-all duration-300 bg-gradient-to-br from-warning/10 to-warning/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Estoque Baixo
                </CardTitle>
                <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">{stats.lowStock.length}</div>
              <p className="text-sm text-muted-foreground mt-1">produtos</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant hover:shadow-float transition-all duration-300 bg-gradient-to-br from-destructive/10 to-destructive/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Esgotados
                </CardTitle>
                <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">{stats.outOfStock.length}</div>
              <p className="text-sm text-muted-foreground mt-1">produtos</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant hover:shadow-float transition-all duration-300 bg-gradient-to-br from-muted/30 to-muted/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Muito Stock
                </CardTitle>
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">{stats.slowMoving.length}</div>
              <p className="text-sm text-muted-foreground mt-1">produtos</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant hover:shadow-float transition-all duration-300 bg-gradient-to-br from-success/10 to-success/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Vendas Hoje
                </CardTitle>
                <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">R$ {stats.todayRevenue.toFixed(2)}</div>
              <div className="flex items-center gap-2 mt-1">
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{stats.todayOrders.length} pedidos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-none shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Vendas dos Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-6 h-64 px-4">
              {stats.last7Days.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-xl transition-all duration-500 hover:from-primary/90 hover:to-primary/80 hover:scale-105 shadow-lg"
                    style={{ 
                      height: `${(item.value / maxValue) * 100}%`,
                      minHeight: item.value > 0 ? '10px' : '0',
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                  <div className="text-center">
                    <span className="text-sm font-semibold text-foreground block">{item.day}</span>
                    <span className="text-xs text-muted-foreground">R$ {item.value.toFixed(0)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Listas de Stock Baixo e Esgotado */}
        {/* ... (Podes usar o código anterior mas mapeando stats.lowStock e stats.outOfStock) */}
      </main>
    </div>
  );
};

export default AdminDashboard;