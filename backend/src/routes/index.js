const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const orderRoutes = require('./orderRoutes');
const settingsRoutes = require('./settingsRoutes');

// Agrupa todas as rotas da API
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/settings', settingsRoutes);

module.exports = router;