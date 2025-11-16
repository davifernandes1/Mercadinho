import React, { createContext, useContext, useState, useCallback } from "react";
// --- 1. IMPORTAR PRODUTOS E MOCKS ---
import { Product, mockProductsData } from "@/lib/products";

// Pega todos os produtos de todas as categorias e junta numa lista só
const allMockProducts = Object.values(mockProductsData).flat();

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  // Funções do Carrinho
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantityToAdd?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  
  // Modais
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;

  // --- 2. NOVO ESTADO GLOBAL DE PRODUTOS E FUNÇÕES CRUD ---
  products: Product[];
  addProduct: (productData: Omit<Product, "id">) => void;
  updateProduct: (productId: string, productData: Omit<Product, "id">) => void;
  deleteProduct: (productId: string) => void;
  // --- FIM DA NOVIDADE ---
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- ESTADOS ---
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  
  // --- 3. NOVO ESTADO GLOBAL DE PRODUTOS ---
  const [products, setProducts] = useState<Product[]>(allMockProducts);

  // --- FUNÇÕES DO CARRINHO (Sem alteração) ---
  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">, quantityToAdd: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === newItem.id);
        if (existing) {
          return prev.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item,
          );
        }
        return [...prev, { ...newItem, quantity: quantityToAdd }];
      });
      setIsCartOpen(true);
    },
    [],
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
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // --- 4. NOVAS FUNÇÕES CRUD GLOBAIS ---
  // (Aqui você colocará a lógica do seu backend no futuro)

  const addProduct = useCallback((productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `new_${Date.now()}`, // ID temporário (o backend cuidará disso)
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((productId: string, productData: Omit<Product, "id">) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, ...productData, id: productId } : p
      )
    );
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);
  // --- FIM DAS NOVAS FUNÇÕES ---


  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,

        // --- 5. EXPONDO O ESTADO GLOBAL ---
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        // --- FIM DA EXPOSIÇÃO ---
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