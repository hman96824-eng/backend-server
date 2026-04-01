import express from 'express';
import productController from './controller.js';

const router = express.Router();

router.post('/create', productController.createProduct);
router.post('/bulk-create', productController.bulkCreateProducts);

router.get('/get', productController.getProducts);

export default router;
