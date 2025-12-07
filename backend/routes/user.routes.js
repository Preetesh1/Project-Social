import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = Router();

router.route('/register').get(register);
router.route('/login').post(login);

export default router;