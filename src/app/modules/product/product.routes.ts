import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/product', ProductControllers.createProduct);

export const ProductRoutes = router;