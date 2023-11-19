import setUpSocketIO from "./socketIoHandler.ts";

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        setUpSocketIO(server.httpServer);
    }
};
