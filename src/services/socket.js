import { io } from 'socket.io-client';

const SOCKET_URL = 'https://api.disanalam.me';
// const SOCKET_URL = 'http://localhost:5000'; // For local development

const socket = io(SOCKET_URL, {
  autoConnect: true,
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('🔌 Connected to Socket.IO Server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected from Socket.IO Server');
});

export default socket;
