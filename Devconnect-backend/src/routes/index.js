const router = require('express').Router();
const { apiLimiter } = require('../middleware/rateLimit.middleware');
router.use(apiLimiter);
router.use('/auth', require('./auth.routes'));
router.use('/posts', require('./post.routes'));
router.use('/users', require('./user.routes'));
router.use('/chats', require('./chat.routes'));
router.use('/admin', require('./admin.routes'));
module.exports = router;
