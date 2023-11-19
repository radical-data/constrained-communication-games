import { Server } from 'socket.io';
import { users } from './src/stores.ts';
import type { Message } from './src/types.ts';

export default function setUpSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        // when user connects
        const username = `${Math.round(Math.random() * 999999)}`;
        socket.emit('name', username);
        users.update((users) => [...users, username]);
        users.subscribe((users) => console.log(users));
        console.log(`new user connected: ${username}`);

        socket.on('message', (message: Message) => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleString()
            });
            console.log(`User ${username} sent a message: ${message}`);
        });

        socket.on('disconnect', () => {
            users.subscribe((currentUsers) => {
                const disconnectedUserIndex = currentUsers.findIndex((user) => user === username);
                if (disconnectedUserIndex !== -1) {
                    const updatedUsers = [...currentUsers.slice(0, disconnectedUserIndex), ...currentUsers.slice(disconnectedUserIndex + 1)];
                    users.set(updatedUsers);
                }
            });
            console.log(`user disconnected: ${username}`);
        });
    });

    console.log('SocketIO server initialized and connected');
}