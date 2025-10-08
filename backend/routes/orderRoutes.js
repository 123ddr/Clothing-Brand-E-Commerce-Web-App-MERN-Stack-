import express from 'express';
import { createOrder, getOrdersForUser } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/', protect, getOrdersForUser);

export default router;
