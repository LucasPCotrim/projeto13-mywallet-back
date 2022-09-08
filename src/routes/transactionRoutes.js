import { Router } from 'express';
import { getTransactions, registerTransaction } from '../controllers/transactionController.js';
import { authorizeUserMiddleware } from '../middleware/authorizeUserMiddleware.js';

const router = Router();

router.get('/transactions', authorizeUserMiddleware, getTransactions);
router.post('/transactions', authorizeUserMiddleware, registerTransaction);

export default router;
