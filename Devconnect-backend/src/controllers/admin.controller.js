const User = require('../models/User.model');
const Post = require('../models/Post.model');
const { success } = require('../utils/response');

exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalPosts, activeUsers] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments({ isActive: true }),
      User.countDocuments({ lastSeen: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    ]);
    success(res, { stats: { totalUsers, totalPosts, activeUsers } });
  } catch (e) { next(e); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(100);
    success(res, { users });
  } catch (e) { next(e); }
};

exports.toggleUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(Object.assign(new Error('User not found'), { statusCode: 404 }));
    user.isActive = !user.isActive;
    await user.save();
    success(res, { isActive: user.isActive });
  } catch (e) { next(e); }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, { isActive: false });
    success(res, {}, 'Post removed');
  } catch (e) { next(e); }
};
