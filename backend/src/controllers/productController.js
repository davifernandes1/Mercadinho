//
import Product from '../models/Product.js';

// Middleware de tratamento de erro genérico
const handleError = (res, err, message = 'Erro desconhecido') => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, error: err });
  }
  return res.status(500).json({ message, error: err.message });
};

// READ all com Filtros e Ordenação
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    // 1. Construir o objeto de filtro
    let filter = {};
    
    // Filtro por categoria (se existir e não for 'all')
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Filtro por nome (barra de pesquisa) - Case insensitive
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // 2. Construir o objeto de ordenação
    let sortOptions = {};
    if (sort === 'price-asc') {
      sortOptions.price = 1; // Menor preço
    } else if (sort === 'price-desc') {
      sortOptions.price = -1; // Maior preço
    } else if (sort === 'name') {
      sortOptions.name = 1; // A-Z
    }
    // 'popular' ou padrão não aplica ordenação específica (ou poderia ser por vendas)

    const products = await Product.find(filter)
      .populate('category')
      .sort(sortOptions);
      
    res.json(products);
  } catch (err) {
    handleError(res, err, 'Erro ao buscar produtos');
  }
};

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    handleError(res, err, 'Erro ao criar produto');
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    handleError(res, err, 'Erro ao atualizar produto');
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao deletar produto');
  }
};