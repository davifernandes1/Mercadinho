import express from 'express';
const router = express.Router();
// Usamos "import * as" para importar todas as exportações nomeadas (export const)
import * as orderController from '../controllers/orderController.js';

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);

export default router;