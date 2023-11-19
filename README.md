# Constrained Communication Games

A playground to train for building connection in places built for the opposite.

## Developing

Once you've created a project and installed dependencies with `bun install`, start a development server:

```bash
bun --bun run dev
```

## Building

To create a production version of your app:

```bash
bun --bun run build
```

## File guide

The files involved in the socket.io server:

- webSocketConnection.ts: This file establishes a WebSocket connection using Socket.IO and exports the io variable for use in other modules. It abstracts the connection logic, making it reusable and maintainable.
- socketIoHandler.ts: This module contains the logic for the Socket.IO server. It handles connections, generates random usernames, and broadcasts messages to connected clients. The setUpSocketIO function initializes Socket.IO and defines event handlers.
- webSocketPluginVite.ts: This file defines a Vite plugin that configures the WebSocket server. It utilizes the setUpSocketIO function to set up the Socket.IO server within Vite, enabling WebSocket functionality during development.
- vite.config.ts: This file contains the Vite configuration, including the server setup and plugins. It imports the webSocketServer plugin, which integrates the WebSocket functionality into Vite.
- Production only
    - src/server.ts: This file sets up an Express server, integrates SvelteKit handlers, and initializes the Socket.IO server using setUpSocketIO. It effectively combines the HTTP server, SvelteKit, and Socket.IO.

