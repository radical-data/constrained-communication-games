import ioClient from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_WS_ENDPOINT || 'http://localhost:3001/';

const socket = ioClient(ENDPOINT);

console.log(`Communicating with websockets server at ${ENDPOINT}`);

export const io = socket;