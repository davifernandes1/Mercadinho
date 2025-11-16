const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  category: { 
    type: String, // Usando o ID string (ex: 'bebidas')
    ref: 'Category', // Aponta para o modelo 'Category'
    required: true 
  },
});

module.exports = mongoose.model('Product', ProductSchema);