import ioClient from 'socket.io-client';

const ENDPOINT = 'https://ccg-api.stolenartifacts.org';
// const ENDPOINT = import.meta.env.VITE_WS_ENDPOINT;
// if (!ENDPOINT) {
//   throw new Error('VITE_WS_ENDPOINT is not set');
// }

const socket = ioClient(ENDPOINT);
console.log(`Communicating with websockets server at ${ENDPOINT}`);
export const io = socket;
