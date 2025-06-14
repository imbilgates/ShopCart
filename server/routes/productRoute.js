import express from 'express';
import { createManyProducts, createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.post('/bulk', createManyProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
