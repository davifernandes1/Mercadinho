import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true 
  },
  price: {
    type: Number,
    required: true,
    min: 0 
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0 
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true 
  },
  image: {
    type: String,
    required: false, 
    default: ''
  }
}, {
  timestamps: true 
});

// Cria e exporta o modelo
const Product = mongoose.model('Product', productSchema);
export default Product;