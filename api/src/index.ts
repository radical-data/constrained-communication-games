import { createServer } from "http";
import cors from "cors";
import express from "express";
import setUpSocket from "./socketHandler";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

const server = createServer(app);

setUpSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
