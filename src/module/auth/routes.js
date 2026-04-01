import express from 'express';
import authController from './controller.js';

const router = express.Router();


router.post('/create',authController.createUser);
router.post('/bulk-create', authController.bulkCreateUsers);

export default router;