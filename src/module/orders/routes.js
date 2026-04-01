import express from 'express';
import orderController from './controller.js';

const router = express.Router();

router.post('/create', orderController.createOrder);
router.post('/bulk-create', orderController.bulkCreateOrders);

router.get('/get',orderController.getOrder)

export default router;
