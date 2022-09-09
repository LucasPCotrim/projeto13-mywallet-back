import { Router } from 'express';
import { userSignUp, userLogin, UserlogOut } from '../controllers/authenticationController.js';
import { authorizeUserMiddleware } from '../middleware/authorizeUserMiddleware.js';

const router = Router();

router.post('/sign-up', userSignUp);
router.post('/login', userLogin);
router.post('/logout', authorizeUserMiddleware, UserlogOut);

export default router;
