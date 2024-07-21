import ioClient from 'socket.io-client';
const ENDPOINT = 'localhost:3000/';

const socket = ioClient(ENDPOINT);

export const io = socket;
