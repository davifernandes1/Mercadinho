
export interface Order {
  _id: string; // O ID do MongoDB
  id: string; // O ID do MongoDB (para consistência do frontend)
  total: number;
  status: string;
  items: {
    product: string; // ID do produto
    name_at_sale: string;
    price_at_sale: number;
    quantity: number;
  }[];
  createdAt: string; // O backend adiciona isso (timestamps: true)
  updatedAt: string;
}