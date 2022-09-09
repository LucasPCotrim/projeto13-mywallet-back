import { Router } from 'express';
import {
  getTransactions,
  registerTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';
import { authorizeUserMiddleware } from '../middleware/authorizeUserMiddleware.js';

const router = Router();

router.get('/transactions', authorizeUserMiddleware, getTransactions);
router.post('/transactions', authorizeUserMiddleware, registerTransaction);
router.delete('/transactions/:transactionId', authorizeUserMiddleware, deleteTransaction);

export default router;
