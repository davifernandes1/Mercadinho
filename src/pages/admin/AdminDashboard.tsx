import { Package, AlertTriangle, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";
import { CustomerSidebar } from "@/components/CustomerSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const lowStockProducts = [
    { name: "Guaraná Antarctica 2L", stock: 3 },
    { name: "Energético Red Bull", stock: 8 },
  ];

  const outOfStockProducts = [
    { name: "Suco Del Valle 1L", stock: 0 },
  ];

  const slowMovingProducts = [
    { name: "Produto X", lastSale: "há 15 dias" },
  ];

  const salesData = [
    { day: "Seg", value: 450 },
    { day: "Ter", value: 680 },
    { day: "Qua", value: 520 },
    { day: "Qui", value: 890 },
    { day: "Sex", value: 1200 },
    { day: "Sáb", value: 1500 },
    { day: "Dom", value: 980 },
  ];

  const maxValue = Math.max(...salesData.map((d) => d.value));

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
              <div className="text-4xl font-bold text-foreground">2</div>
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
              <div className="text-4xl font-bold text-foreground">1</div>
              <p className="text-sm text-muted-foreground mt-1">produto</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant hover:shadow-float transition-all duration-300 bg-gradient-to-br from-muted/30 to-muted/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Encalhados
                </CardTitle>
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">1</div>
              <p className="text-sm text-muted-foreground mt-1">produto</p>
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
              <div className="text-4xl font-bold text-foreground">R$ 980</div>
              <div className="flex items-center gap-2 mt-1">
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">24 pedidos</p>
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
              {salesData.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-3">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-xl transition-all duration-500 hover:from-primary/90 hover:to-primary/80 hover:scale-105 shadow-lg"
                    style={{ 
                      height: `${(item.value / maxValue) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                  <div className="text-center">
                    <span className="text-sm font-semibold text-foreground block">{item.day}</span>
                    <span className="text-xs text-muted-foreground">R$ {item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-warning" />
                Produtos com Estoque Baixo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl border border-warning/20 hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="font-semibold text-foreground">{product.name}</span>
                    <span className="px-3 py-1 bg-warning/20 text-warning font-bold rounded-full text-sm">
                      {product.stock} unidades
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-muted-foreground" />
                Produtos Encalhados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {slowMovingProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-muted hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="font-semibold text-foreground">{product.name}</span>
                    <span className="text-muted-foreground text-sm">{product.lastSale}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
