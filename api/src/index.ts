import { createServer } from 'http';
import express from 'express';
import setUpSocket from './socketHandler';

const app = express();
const server = createServer(app);

setUpSocket(server);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});