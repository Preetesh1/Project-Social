const User = require('../models/User.model');
const ApiError = require('../utils/apiError');

const getProfile = async (username) => {
  const user = await User.findOne({ username }).select('-password -notifications');
  if (!user) throw new ApiError('User not found', 404);
  user.profileViews += 1;
  await user.save({ validateBeforeSave: false });
  return user;
};

const updateProfile = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
  return user.toSafeObject();
};

const sendConnectionRequest = async (fromId, toId) => {
  if (fromId === toId) throw new ApiError('Cannot connect with yourself', 400);
  const toUser = await User.findById(toId);
  if (!toUser) throw new ApiError('User not found', 404);
  const exists = toUser.connectionRequests.some(r => r.from.toString() === fromId);
  if (exists) throw new ApiError('Request already sent', 400);
  toUser.connectionRequests.push({ from: fromId });
  toUser.notifications.push({ type: 'connection', from: fromId, message: 'sent you a connection request' });
  await toUser.save();
  return { message: 'Connection request sent' };
};

const respondToConnection = async (userId, fromId, action) => {
  const user = await User.findById(userId);
  const request = user.connectionRequests.find(r => r.from.toString() === fromId);
  if (!request) throw new ApiError('Request not found', 404);
  request.status = action;
  if (action === 'accepted') {
    user.connections.push(fromId);
    const fromUser = await User.findById(fromId);
    fromUser.connections.push(userId);
    await fromUser.save();
  }
  await user.save();
  return { message: `Connection ${action}` };
};

const searchUsers = async (query, page = 1, limit = 20) => {
  const regex = new RegExp(query, 'i');
  return User.find({
    $or: [{ name: regex }, { username: regex }, { headline: regex }, { skills: regex }],
    isActive: true,
  }).select('name username avatar headline skills location').skip((page - 1) * limit).limit(limit);
};

module.exports = { getProfile, updateProfile, sendConnectionRequest, respondToConnection, searchUsers };
