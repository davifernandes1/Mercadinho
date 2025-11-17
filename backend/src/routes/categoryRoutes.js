import express from 'express';
const router = express.Router();
// Usamos "import * as" para importar todas as exportações nomeadas (export const)
import * as categoryController from '../controllers/categoryController.js';

router.get('/', categoryController.getAllCategories);

export default router;