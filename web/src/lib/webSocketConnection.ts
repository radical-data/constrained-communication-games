import ioClient from 'socket.io-client';
const ENDPOINT = process.env.WS_ENDPOINT || 'https://localhost:3001/';

const socket = ioClient(ENDPOINT);

export const io = socket;
