const Product = require('../models/Product');

// Middleware de tratamento de erro genérico
const handleError = (res, err, message = 'Erro desconhecido') => {
  console.error(err);
  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, error: err });
  }
  // Erro genérico
  return res.status(500).json({ message, error: err.message });
};

// READ all
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    handleError(res, err, 'Erro ao buscar produtos');
  }
};

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    handleError(res, err, 'Erro ao criar produto');
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    handleError(res, err, 'Erro ao atualizar produto');
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao deletar produto');
  }
};