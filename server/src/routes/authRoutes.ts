import { Router } from 'express';
import { register, login, verifyEmail,LogOut } from '../controllers/authController';
import verifyToken from '../middlewares/authMiddleware';

const router = Router();

router.post('/register',register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/logout', LogOut);


export default router;
