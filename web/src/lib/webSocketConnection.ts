import ioClient from 'socket.io-client';
const ENDPOINT = process.env.WS_ENDPOINT || 'http://localhost:3001/';

const socket = ioClient(ENDPOINT);

console.log(`Communicating with websockets server at ${ENDPOINT}`);

export const io = socket;
