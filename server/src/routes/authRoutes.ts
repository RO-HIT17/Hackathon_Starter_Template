import { Router } from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/update',authenticateJWT,updateUser);

export default router;
