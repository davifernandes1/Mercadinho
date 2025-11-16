// Interface que será usada por todos os produtos
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string; 
  description?: string;
}

// Interface para o objeto de dados
interface MockData {
  [key: string]: Product[];
}

export const mockProductsData: MockData = {
  // --- BEBIDAS ---
  bebidas: [
    {
      id: "b1",
      name: "Coca-Cola 2L",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop",
      stock: 25,
      category: "bebidas", 
      description: "Refrigerante de cola clássico, perfeito para qualquer ocasião.",
    },
    {
      id: "b2",
      name: "Guaraná Antarctica 2L",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1618885122131-483785121c6b?w=400&h=400&fit=crop",
      stock: 30,
      category: "bebidas", 
      description: "O sabor original do Brasil. Refrescante e delicioso.",
    },
    {
      id: "b3",
      name: "Água Mineral 1.5L",
      price: 3.50,
      image: "https://images.unsplash.com/photo-1559839914-17aae19f55da?w=400&h=400&fit=crop",
      stock: 50,
      category: "bebidas", 
      description: "Água mineral sem gás, leve e pura.",
    },
    {
      id: "b4",
      name: "Suco de Laranja 1L",
      price: 8.50,
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
      stock: 15,
      category: "bebidas", 
      description: "Suco de laranja 100% natural, feito com laranjas selecionadas.",
    },
  ],
  
  // --- PADARIA ---
  padaria: [
    {
      id: "p1",
      name: "Pão Francês (Un)",
      price: 0.75,
      image: "https://images.unsplash.com/photo-1578880625198-891b366a6a1e?w=400&h=400&fit=crop",
      stock: 100,
      category: "padaria", 
      description: "Pão francês fresquinho, crocante por fora e macio por dentro.",
    },
    {
      id: "p2",
      name: "Pão de Forma Integral",
      price: 7.99,
      image: "https://images.unsplash.com/photo-16279A0332883-146b7c73f360?w=400&h=400&fit=crop",
      stock: 20,
      category: "padaria", 
      description: "Pão de forma 100% integral, rico em fibras.",
    },
    {
      id: "p3",
      name: "Bolo de Chocolate (Fatia)",
      price: 6.50,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
      stock: 10,
      category: "padaria", 
      description: "Fatia generosa de bolo de chocolate com cobertura de brigadeiro.",
    },
  ],

  // --- CONGELADOS ---
  congelados: [
    {
      id: "c1",
      name: "Pizza Congelada",
      price: 22.90,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
      stock: 12,
      category: "congelados", 
      description: "Pizza sabor calabresa, pronta para assar.",
    },
    {
      id: "c2",
      name: "Pão de Queijo (Pct 400g)",
      price: 10.50,
      image: "https://images.unsplash.com/photo-1594917845761-d0a09a53f668?w=400&h=400&fit=crop",
      stock: 20,
      category: "congelados", 
      description: "Pão de queijo tradicional mineiro, fácil de preparar.",
    },
    {
      id: "c3",
      name: "Lasanha Bolonhesa 600g",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1633436374961-a3083c83423f?w=400&h=400&fit=crop",
      stock: 8,
      category: "congelados", 
      description: "Lasanha congelada com molho à bolonhesa e queijo.",
    },
  ],

  // --- LIMPEZA ---
  limpeza: [
    {
      id: "l1",
      name: "Detergente Neutro 500ml",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1627083044078-600de5de3b4b?w=400&h=400&fit=crop",
      stock: 40,
      category: "limpeza", 
      description: "Detergente neutro para louças, alto poder desengordurante.",
    },
    {
      id: "l2",
      name: "Água Sanitária 1L",
      price: 4.50,
      image: "https://images.unsplash.com/photo-1604329061513-391485602336?w=400&h=400&fit=crop",
      stock: 30,
      category: "limpeza", 
      description: "Água sanitária com cloro ativo, ideal para desinfetar.",
    },
    {
      id: "l3",
      name: "Sabão em Pó 1kg",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1599304028687-9e41401347b8?w=400&h=400&fit=crop",
      stock: 15,
      category: "limpeza", 
      description: "Sabão em pó para lavagem de roupas brancas e coloridas.",
    },
  ],
  
  // --- HORTIFRUTI ---
  hortifruti: [
    {
      id: "h1",
      name: "Banana Prata (Kg)",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&h=400&fit=crop",
      stock: 50,
      category: "hortifruti", 
      description: "Banana prata fresca, vendida por quilo.",
    },
    {
      id: "h2",
      name: "Maçã Gala (Un)",
      price: 1.50,
      image: "https://images.unsplash.com/photo-1606757389667-4d6c6d401366?w=400&h=400&fit=crop",
      stock: 80,
      category: "hortifruti", 
      description: "Maçã gala suculenta e doce.",
    },
    {
      id: "h3",
      name: "Alface Crespa (Un)",
      price: 3.20,
      image: "https://images.unsplash.com/photo-1557126692-23f1c9d01e0a?w=400&h=400&fit=crop",
      stock: 20,
      category: "hortifruti", 
      description: "Alface crespa hidropônica, sempre fresca.",
    },
  ],

  // --- MERCEARIA ---
  mercearia: [
    {
      id: "m1",
      name: "Arroz Branco Tipo 1 (1kg)",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1586201375765-c1d683b3e158?w=400&h=400&fit=crop",
      stock: 40,
      category: "mercearia",
      description: "Arroz branco agulhinha, tipo 1, não precisa lavar.",
    },
    {
      id: "m2",
      name: "Feijão Carioca (1kg)",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1595291248916-240f22414a34?w=400&h=400&fit=crop",
      stock: 35,
      category: "mercearia",
      description: "Feijão carioca de grãos macios e saborosos.",
    },
    {
      id: "m3",
      name: "Macarrão Espaguete 500g",
      price: 4.80,
      image: "https://images.unsplash.com/photo-1621996346565-e326e7e4024b?w=400&h=400&fit=crop",
      stock: 30,
      category: "mercearia", 
      description: "Macarrão de sêmola com ovos, tipo espaguete.",
    },
  ],
};