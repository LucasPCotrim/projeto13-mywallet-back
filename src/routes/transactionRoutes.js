import { Router } from 'express';
import {
  getTransactions,
  registerTransaction,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionController.js';
import { authorizeUserMiddleware } from '../middleware/authorizeUserMiddleware.js';

const router = Router();

router.get('/transactions', authorizeUserMiddleware, getTransactions);
router.post('/transactions', authorizeUserMiddleware, registerTransaction);
router.delete('/transactions/:transactionId', authorizeUserMiddleware, deleteTransaction);
router.put('/transactions/:transactionId', authorizeUserMiddleware, updateTransaction);

export default router;
