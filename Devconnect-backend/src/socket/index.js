const { Server } = require('socket.io');
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User.model');
const logger = require('../utils/logger');
const registerChatSocket = require('./chat.socket');
const registerNotifSocket = require('./notif.socket');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Unauthorized'));
      const decoded = verifyToken(token);
      socket.user = await User.findById(decoded.id).select('name avatar username');
      if (!socket.user) return next(new Error('User not found'));
      next();
    } catch { next(new Error('Invalid token')); }
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.user.username} [${socket.id}]`);
    socket.join(`user:${socket.user._id}`);
    User.findByIdAndUpdate(socket.user._id, { lastSeen: new Date() }).exec();
    registerChatSocket(io, socket);
    registerNotifSocket(io, socket);
    socket.on('disconnect', () => {
      User.findByIdAndUpdate(socket.user._id, { lastSeen: new Date() }).exec();
      logger.info(`Socket disconnected: ${socket.user.username}`);
    });
  });

  return io;
};

module.exports = { initSocket };
