// Localização: backend/seed/mockData.js

// Usamos as categorias da sua página Home.tsx
export const mockProducts = [
  // --- Bebidas ---
  {
    name: "Coca-Cola 2L",
    price: 8.99,
    stock: 25,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&h=300&fit=crop",
  },
  {
    name: "Guaraná Antarctica 2L",
    price: 7.99,
    stock: 3, // Estoque baixo
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop",
  },
  {
    name: "Suco Del Valle 1L",
    price: 6.50,
    stock: 0, // Esgotado
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop",
  },
  {
    name: "Água Mineral 500ml",
    price: 2.50,
    stock: 50,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1559839914-17aae19f55da?w=300&h=300&fit=crop",
  },
  {
    name: "Cerveja Heineken Lata",
    price: 4.99,
    stock: 15,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=300&fit=crop",
  },
  {
    name: "Energético Red Bull",
    price: 9.99,
    stock: 8, // Estoque baixo
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1622543925917-763c34c1a86e?w=300&h=300&fit=crop",
  },

  // --- Padaria ---
  {
    name: "Pão Francês (Unidade)",
    price: 0.75,
    stock: 100,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1598373182137-51662e08dace?w=300&h=300&fit=crop",
  },
  {
    name: "Pão de Queijo (100g)",
    price: 4.50,
    stock: 50,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1589693683083-142f39d0b368?w=300&h=300&fit=crop",
  },
  {
    name: "Bolo de Chocolate (Fatia)",
    price: 7.00,
    stock: 15,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
  },
  {
    name: "Croissant de Manteiga",
    price: 5.50,
    stock: 20,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4b8f4c8c?w=300&h=300&fit=crop",
  },
  {
    name: "Sonho de Creme",
    price: 6.00,
    stock: 12,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1617082408605-e41c42f6e974?w=300&h=300&fit=crop",
  },
  {
    name: "Baguete",
    price: 8.00,
    stock: 30,
    category: "padaria",
    image: "https://images.unsplash.com/photo-1560030018-d78f4a1f643e?w=300&h=300&fit=crop",
  },

  // --- Congelados ---
  {
    name: "Pizza Sadia (Calabresa)",
    price: 19.90,
    stock: 15,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0905e?w=300&h=300&fit=crop",
  },
  {
    name: "Lasanha Bolonhesa (Sadia)",
    price: 15.00,
    stock: 10,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1633436375765-6b904b3b27b2?w=300&h=300&fit=crop",
  },
  {
    name: "Pão de Alho (Pacote)",
    price: 12.00,
    stock: 20,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1615858604758-761f22e7561d?w=300&h=300&fit=crop",
  },
  {
    name: "Açaí (Pote 1L)",
    price: 25.00,
    stock: 8,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1516558141570-b747e76e736a?w=300&h=300&fit=crop",
  },
  {
    name: "Sorvete Kibon (Napolitano)",
    price: 22.00,
    stock: 12,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1567204563197-02b4155452f0?w=300&h=300&fit=crop",
  },
  {
    name: "Nuggets de Frango (Caixa)",
    price: 14.50,
    stock: 18,
    category: "congelados",
    image: "https://images.unsplash.com/photo-1619881591533-89e4a3b75cfa?w=300&h=300&fit=crop",
  },

  // --- Limpeza ---
  {
    name: "Detergente Ypê (Neutro)",
    price: 2.50,
    stock: 40,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1628135017043-a86b95b05f2c?w=300&h=300&fit=crop",
  },
  {
    name: "Sabão em Pó (Omo 1kg)",
    price: 15.90,
    stock: 20,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1594042236166-3a72a1380231?w=300&h=300&fit=crop",
  },
  {
    name: "Água Sanitária (QBoa 1L)",
    price: 4.00,
    stock: 30,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1588111952223-f3630e660b54?w=300&h=300&fit=crop",
  },
  {
    name: "Desinfetante Pinho Sol",
    price: 7.50,
    stock: 15,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1599304193582-7f91216a6950?w=300&h=300&fit=crop",
  },
  {
    name: "Esponja de Aço (Bombril)",
    price: 3.00,
    stock: 50,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1584777501334-9d5a39031070?w=300&h=300&fit=crop",
  },
  {
    name: "Saco de Lixo (20L)",
    price: 9.00,
    stock: 25,
    category: "limpeza",
    image: "https://images.unsplash.com/photo-1595103608240-9e6b2110c0b8?w=300&h=300&fit=crop",
  },

  // --- Hortifruti ---
  {
    name: "Banana (Cacho 1kg)",
    price: 5.99,
    stock: 20,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1571770095011-bb66935b6f38?w=300&h=300&fit=crop",
  },
  {
    name: "Maçã (Unidade)",
    price: 1.50,
    stock: 40,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1610397821025-f77de0e0626b?w=300&h=300&fit=crop",
  },
  {
    name: "Laranja (1kg)",
    price: 4.00,
    stock: 15,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1611080626919-775a408a11c2?w=300&h=300&fit=crop",
  },
  {
    name: "Alface (Unidade)",
    price: 3.00,
    stock: 10,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1557800096-43c8a41c60f2?w=300&h=300&fit=crop",
  },
  {
    name: "Tomate (1kg)",
    price: 6.99,
    stock: 12,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1518737330756-3d2b70740b2f?w=300&h=300&fit=crop",
  },
  {
    name: "Batata (1kg)",
    price: 5.00,
    stock: 30,
    category: "hortifruti",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba657?w=300&h=300&fit=crop",
  },

  // --- Mercearia ---
  {
    name: "Arroz Tio João (5kg)",
    price: 29.90,
    stock: 20,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1585433066035-ad3c8340f1a4?w=300&h=300&fit=crop",
  },
  {
    name: "Feijão Carioca (1kg)",
    price: 8.50,
    stock: 25,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1594581308239-2a9117e3f87b?w=300&h=300&fit=crop",
  },
  {
    name: "Óleo de Soja (Liza)",
    price: 7.99,
    stock: 30,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1576722237434-a1a6e3c09b53?w=300&h=300&fit=crop",
  },
  {
    name: "Café Pilão (500g)",
    price: 18.00,
    stock: 15,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1511537190169-0a1902d53b23?w=300&h=300&fit=crop",
  },
  {
    name: "Açúcar União (1kg)",
    price: 5.00,
    stock: 40,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1628102352166-7b06a5b67b14?w=300&h=300&fit=crop",
  },
  {
    name: "Leite Integral (Caixa)",
    price: 4.50,
    stock: 50,
    category: "mercearia",
    image: "https://images.unsplash.com/photo-1598978430852-bae2e816a7b2?w=300&h=300&fit=crop",
  },
];