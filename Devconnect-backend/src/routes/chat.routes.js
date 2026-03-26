const router = require('express').Router();
const ctrl = require('../controllers/chat.controller');
const { protect } = require('../middleware/auth.middleware');
router.use(protect);
router.get('/', ctrl.getUserChats);
router.get('/:userId', ctrl.getOrCreateChat);
module.exports = router;
