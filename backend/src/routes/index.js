import express from 'express';
const router = express.Router();

// Importa as rotas (agora com .js e sintaxe ESM)
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import settingsRoutes from './settingsRoutes.js';

// Agrupa todas as rotas da API
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/settings', settingsRoutes);

// Exporta o roteador em ESM
export default router;