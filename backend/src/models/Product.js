import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove espaços em branco
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Preço não pode ser negativo
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0 // Começa com 0 se não for fornecido
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true // Facilita a filtragem (ex: "bebidas", "padaria")
  },
  image: {
    type: String,
    required: false, // Deixa como opcional por enquanto
    default: ''
  }
}, {
  timestamps: true // Adiciona 'createdAt' e 'updatedAt' automaticamente
});

// Cria e exporta o modelo
const Product = mongoose.model('Product', productSchema);
export default Product;