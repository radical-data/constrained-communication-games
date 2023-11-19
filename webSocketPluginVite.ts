import setUpSocketIO from "./socketIoHandler";

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        setUpSocketIO(server.httpServer);
    }
};
