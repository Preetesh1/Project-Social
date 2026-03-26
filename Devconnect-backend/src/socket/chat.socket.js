const { sendMessage } = require('../services/chat.service');

module.exports = (io, socket) => {
  socket.on('chat:join', ({ chatId }) => socket.join(`chat:${chatId}`));

  socket.on('chat:message', async ({ chatId, content }) => {
    if (!content?.trim()) return;
    try {
      const message = await sendMessage(chatId, socket.user._id, content.trim());
      io.to(`chat:${chatId}`).emit('chat:message', {
        ...message.toObject(),
        sender: { _id: socket.user._id, name: socket.user.name, avatar: socket.user.avatar },
      });
    } catch (e) { socket.emit('chat:error', { message: e.message }); }
  });

  socket.on('chat:typing', ({ chatId }) => socket.to(`chat:${chatId}`).emit('chat:typing', { userId: socket.user._id }));
  socket.on('chat:stopTyping', ({ chatId }) => socket.to(`chat:${chatId}`).emit('chat:stopTyping', { userId: socket.user._id }));
};
