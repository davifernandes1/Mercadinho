import { Category } from './categories';

// Esta interface deve espelhar o Schema do Mongoose
export interface Product {
  id: string; // Usamos 'id' no frontend (que será o _id do Mongo)
  _id?: string; // Opcional, para dados vindos da API
  name: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
  image_url?: string; // Para compatibilidade com a Home
  
  // A categoria pode ser apenas o ID (string) ou o objeto populado
  category: string | Category; 
}