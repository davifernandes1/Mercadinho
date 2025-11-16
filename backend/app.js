import express from 'express';
import cors from 'cors';
import Product from './src/models/Product.js'; 
import { mockProducts } from './seed/mockData.js';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para ler JSON do body

// --- Função de Seeding (Como estava antes) ---
const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Banco vazio. Populando com dados de exemplo...');
      await Product.insertMany(mockProducts);
      console.log('Banco de dados populado!');
    } else {
      console.log('Banco de dados já populado.');
    }
  } catch (error) {
    console.error('Erro ao popular o banco:', error.message);
  }
};
seedDatabase();

// ===================================================
// ROTAS DA API (CRUD COMPLETO)
// ===================================================

// --- READ (LER) ---
// (Você já tem esta)
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar produtos.' });
  }
});

// --- CREATE (CRIAR) ---
// Rota: POST /api/products
app.post('/api/products', async (req, res) => {
  try {
    // Pega os dados do corpo (body) da requisição
    const { name, price, stock, category, image } = req.body;
    
    // Validação simples
    if (!name || !price || !stock || !category) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      image: image || 'https://placehold.co/300x300/EBF5EE/1B5E20?text=Sem+Imagem' // Imagem padrão
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // 201 = Criado com sucesso
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro no servidor ao criar produto.' });
  }
});

// --- UPDATE (ATUALIZAR) ---
// Rota: PUT /api/products/:id
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL
    const { name, price, stock, category, image } = req.body; // Pega os dados

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, category, image },
      { new: true, runValidators: true } // 'new: true' retorna o documento atualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro no servidor ao atualizar produto.' });
  }
});

// --- DELETE (EXCLUIR) ---
// Rota: DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: 'Erro no servidor ao excluir produto.' });
  }
});


export default app;