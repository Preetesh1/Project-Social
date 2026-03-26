const router = require('express').Router();
const ctrl = require('../controllers/admin.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');
router.use(protect, adminOnly);
router.get('/stats', ctrl.getStats);
router.get('/users', ctrl.getAllUsers);
router.patch('/users/:id/toggle', ctrl.toggleUserActive);
router.delete('/posts/:id', ctrl.deletePost);
module.exports = router;
