import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/lib/products";
import { Category } from "@/lib/categories"; // <-- Erro de digitação corrigido
import { Order } from "@/lib/orders";
import { toast } from "sonner";

const API_URL = "http://localhost:3001/api";

export interface CartItem {
  id: string; // _id do produto
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// --- Helper para extrair a mensagem de erro de forma segura ---
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
// --- Fim do Helper ---

interface CartContextType {
  // Estado Global
  products: Product[];
  categories: Category[];
  orders: Order[];

  // Funções CRUD Admin (O formulário sempre envia 'category' como string)
  addProduct: (productData: Omit<Product, "id" | "_id" | "image_url" | "category"> & { category: string }) => Promise<void>;
  updateProduct: (productId: string, productData: Omit<Product, "id" | "_id" | "image_url" | "category"> & { category: string }) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  fetchOrders: () => Promise<void>;

  // Funções Carrinho Cliente
  items: CartItem[];
  addItem: (product: Product, quantityToAdd?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  processPayment: () => Promise<{ success: boolean; message: string }>;

  // UI
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // --- FUNÇÃO DE BUSCA DE DADOS ---
  const fetchData = useCallback(async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`)
      ]);
      
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error('Falha ao buscar dados iniciais');
      }

      const productsData: (Product & { _id: string })[] = await productsRes.json();
      const categoriesData: (Category & { _id: string })[] = await categoriesRes.json();
      
      const formattedProducts = productsData.map((p) => ({
        ...p,
        id: p._id,
        image_url: p.image 
      }));
      
      const formattedCategories = categoriesData.map((c) => ({
        ...c,
        id: c._id
      }));

      setProducts(formattedProducts);
      setCategories(formattedCategories);
    } catch (err: unknown) { // <-- CORRIGIDO
      console.error("Falha ao carregar dados da API:", err);
      toast.error(`Erro de conexão: ${getErrorMessage(err)}`);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- FUNÇÕES CRUD (Admin) ---
  
  const addProduct = async (productData: Omit<Product, "id" | "_id" | "image_url" | "category"> & { category: string }) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Falha ao criar produto');
      }
      await fetchData(); 
      toast.success("Produto criado com sucesso!");
    } catch (err: unknown) { // <-- CORRIGIDO
      console.error(err);
      toast.error(`Erro ao criar produto: ${getErrorMessage(err)}`);
    }
  };

  const updateProduct = async (productId: string, productData: Omit<Product, "id" | "_id" | "image_url" | "category"> & { category: string }) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
         const err = await response.json();
        throw new Error(err.message || 'Falha ao atualizar produto');
      }
      await fetchData();
      toast.success("Produto atualizado com sucesso!");
    } catch (err: unknown) { // <-- CORRIGIDO
      console.error(err);
      toast.error(`Erro ao atualizar produto: ${getErrorMessage(err)}`);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Falha ao deletar produto');
      await fetchData();
      toast.success("Produto deletado com sucesso!");
    } catch (err: unknown) { // <-- CORRIGIDO
      console.error(err);
      toast.error(`Erro ao deletar produto: ${getErrorMessage(err)}`);
    }
  };
  
  const fetchOrders = async () => {
     try {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) throw new Error('Falha ao buscar pedidos');
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: unknown) { // <-- CORRIGIDO
        console.error("Falha ao buscar pedidos:", err);
        toast.error(`Erro ao buscar histórico: ${getErrorMessage(err)}`);
      }
  };

  // --- FUNÇÕES DO CARRINHO (Cliente) ---

  const addItem = useCallback(
    (product: Product, quantityToAdd: number = 1) => {
      const itemInCart = items.find(i => i.id === product.id);
      const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;
      
      const productInStock = products.find(p => p.id === product.id);
      const stock = productInStock ? productInStock.stock : product.stock;

      if ((currentQuantityInCart + quantityToAdd) > stock) {
        toast.warning(`Estoque insuficiente para ${product.name}.`, {
          description: `Você já tem ${currentQuantityInCart} no carrinho. Máximo: ${stock} unidades.`
        });
        return;
      }

      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd } // Corrigido para somar 'quantityToAdd'
              : item,
          );
        }
        return [...prev, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          image: product.image,
          quantity: quantityToAdd 
        }];
      });
      setIsCartOpen(true);
    },
    [items, products], 
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }
      
      const product = products.find(p => p.id === id);
      if (product && quantity > product.stock) {
         toast.warning(`Estoque máximo atingido para ${product.name}.`, {
           description: `Temos apenas ${product.stock} unidades.`
         });
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity: product.stock } : item)),
        );
        return;
      }

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
    [removeItem, products],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const processPayment = async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: items.map(i => ({ 
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity
          })), 
          total: totalPrice 
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message };
      }
      
      clearCart();
      await fetchData(); 
      return { success: true, message: 'Pagamento aprovado!' };
      
    } catch (err: unknown) { // <-- CORRIGIDO
      console.error("Falha ao processar pagamento:", err);
      return { success: false, message: getErrorMessage(err) || 'Erro de conexão' };
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        products,
        categories,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchOrders,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        processPayment,
        isCartOpen,
        setIsCartOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};