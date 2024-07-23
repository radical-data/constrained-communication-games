import ioClient from 'socket.io-client';
const ENDPOINT = "https://ccg-api.stolenartifacts.org";

const socket = ioClient(ENDPOINT);

console.log(`Communicating with websockets server at ${ENDPOINT}`);

export const io = socket;
