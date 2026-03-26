module.exports = (io, socket) => {
  socket.on('notif:read', () => socket.emit('notif:cleared'));
};
