import { createServer } from 'http';
import express from 'express';
import setUpSocket from '../../../socketHandler';
import { handler } from '../../../build/handler.js';

const app = express();
const server = createServer(app);

setUpSocket(server);

app.use(handler);

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});