const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

router.post('/register', authLimiter, [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
], validate, ctrl.register);

router.post('/login', authLimiter, [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
], validate, ctrl.login);

router.get('/me', protect, ctrl.me);
router.post('/logout', protect, ctrl.logout);
module.exports = router;
