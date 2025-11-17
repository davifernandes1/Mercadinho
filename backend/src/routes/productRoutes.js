import express from 'express';
const router = express.Router();
// Usamos "import * as" para importar todas as exportações nomeadas (export const)
import * as productController from '../controllers/productController.js';

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;