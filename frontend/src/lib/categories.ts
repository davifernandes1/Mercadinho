import {
  Coffee,
  Sandwich,
  IceCream,
  Package,
  Apple,
  ShoppingBag,
  LucideIcon, 
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string; // Cor original para ícones (se precisar)
  image_url: string; // URL para os cards da Home
}

export const categories: Category[] = [
  {
    id: "bebidas",
    name: "Bebidas",
    icon: Coffee,
    color: "bg-blue-100 text-blue-600",
    image_url: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
  },
  {
    id: "padaria",
    name: "Padaria",
    icon: Sandwich,
    color: "bg-orange-100 text-orange-600",
    image_url: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=400&h=400&fit=crop",
  },
  {
    id: "congelados",
    name: "Congelados",
    icon: IceCream,
    color: "bg-cyan-100 text-cyan-600",
    image_url: "https://images.unsplash.com/photo-1622543925917-763c34c1a86e?w=400&h=400&fit=crop",
  },
  {
    id: "limpeza",
    name: "Limpeza",
    icon: Package,
    color: "bg-green-100 text-green-600",
    image_url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
  },
  {
    id: "hortifruti",
    name: "Hortifruti",
    icon: Apple,
    color: "bg-lime-100 text-lime-600",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
  },
  {
    id: "mercearia",
    name: "Mercearia",
    icon: ShoppingBag,
    color: "bg-amber-100 text-amber-600",
    image_url: "https://images.unsplash.com/photo-1601601329863-9e2580190b9b?w=400&h=400&fit=crop",
  },
];