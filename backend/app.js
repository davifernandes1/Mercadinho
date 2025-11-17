import express from 'express';
import cors from 'cors';
import Product from './src/models/Product.js'; 
import { mockProducts } from './seed/mockData.js';
import allRoutes from './src/routes/index.js'; // <-- IMPORTA O ROTEADOR

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para ler JSON do body

// --- Função de Seeding (Pode continuar aqui) ---
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
// ROTAS DA API
// ===================================================
// Diz ao Express para usar o roteador principal para
// qualquer rota que comece com /api
app.use('/api', allRoutes);

export default app;