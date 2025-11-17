import express from 'express';
const router = express.Router();
// Usamos "import * as" para importar todas as exportações nomeadas (export const)
import * as settingsController from '../controllers/settingsController.js';

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export default router;