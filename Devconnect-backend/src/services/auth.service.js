const User = require('../models/User.model');
const { signToken, signRefreshToken } = require('../utils/jwt');
const ApiError = require('../utils/apiError');

const register = async ({ name, email, password }) => {
  if (await User.findOne({ email })) throw new ApiError('Email already in use', 409);
  const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
  const user = await User.create({ name, email, password, username });
  const token = signToken({ id: user._id });
  const refreshToken = signRefreshToken({ id: user._id });
  return { user: user.toSafeObject(), token, refreshToken };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError('Invalid credentials', 401);
  user.lastSeen = new Date();
  await user.save({ validateBeforeSave: false });
  const token = signToken({ id: user._id });
  const refreshToken = signRefreshToken({ id: user._id });
  return { user: user.toSafeObject(), token, refreshToken };
};

module.exports = { register, login };
