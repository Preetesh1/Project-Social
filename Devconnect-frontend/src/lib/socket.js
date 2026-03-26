import { io } from 'socket.io-client';

let socket = null;

export const getSocket = () => {
  if (!socket && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const s = getSocket();
  if (s && !s.connected) s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};
