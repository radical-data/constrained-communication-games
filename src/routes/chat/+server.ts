import http from 'http';
import express from 'express';
import setUpSocketIO from '../../../socketIoHandler.js';
import { handler } from '../../../build/handler.js';

const app = express();
const server = http.createServer(app);

setUpSocketIO(server);

app.use(handler);

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});