const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name_at_sale: { type: String, required: true },
  price_at_sale: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new Schema({
  total: { type: Number, required: true },
  status: { type: String, default: 'Pago' },
  items: [OrderItemSchema]
}, { 
  timestamps: true // Adiciona createdAt e updatedAt
});

module.exports = mongoose.model('Order', OrderSchema);