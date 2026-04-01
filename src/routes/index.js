import express from 'express';
import authRoutes from '../module/auth/routes.js';
import productRoutes from '../module/product/routes.js';
import orderRoutes from '../module/orders/routes.js';

const router = express.Router();


router.get('/health', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;