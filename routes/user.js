import { Router } from 'express';
const router = Router();
import { signup, login } from '../controllers/user.js';
import * as securityCheckData from '../middlewares/security-check-data.js';


router.post('/signup', securityCheckData.user, signup);
router.post('/login', securityCheckData.user, login);

export default router;
