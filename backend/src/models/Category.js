import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  image_url: { type: String, required: true },
  // Usamos o 'id' do frontend (ex: 'bebidas') como _id no Mongo
  _id: { type: String, required: true },
}, { _id: false }); // Desabilitar _id automático

const Category = mongoose.model('Category', CategorySchema);
export default Category;