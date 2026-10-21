import { io } from 'socket.io-client';

const API_ENDPOINT = import.meta.env.VITE_API_URL || 'https://api.disanalam.me/api';
const SOCKET_URL = API_ENDPOINT.replace(/\/api\/?$/, '');

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  transports: ['websocket'],
});

socket.on('connect', () => {
  // console.log('🔌 Connected to Socket.IO Server:', socket.id); // Commented for production
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected from Socket.IO Server');
});

export default socket;
