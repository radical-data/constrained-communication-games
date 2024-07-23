import ioClient from 'socket.io-client';
const ENDPOINT = "https://ccg.stolenartifacts.org/api";

const socket = ioClient(ENDPOINT);

console.log(`Communicating with websockets server at ${ENDPOINT}`);

export const io = socket;
