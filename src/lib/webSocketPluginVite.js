import setUpSocket from "./socketHandler";

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        setUpSocket(server.httpServer);
    }
};
