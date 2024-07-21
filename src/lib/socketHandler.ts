import { Server } from 'socket.io';
import type { Message, Mode } from './types';
import { modes } from './modes';

const waitingUsers: string[] = [];

function removeWaitingUser(waitingUsers: string[], username: string) {
    const index = waitingUsers.indexOf(username);
    if (index !== -1) {
        waitingUsers.splice(index, 1);
    }
}

function assignMode(possibleModes: Mode[]): Mode {
    const randomIndex = Math.floor(Math.random() * possibleModes.length);
    return possibleModes[randomIndex];
}

export default function setUpSocket(server) {
    const io = new Server(server);
    io.on('connection', (socket) => {
        socket.emit('name', socket.id);
        console.log(`new user connected: ${socket.id}`);
        socket.on('joinWaitingRoom', () => {
            socket.join('waitingRoom');
            console.log(`User ${socket.id} joined the waiting room`);
            waitingUsers.push(socket.id);
            setTimeout(() => {
                tryPairUsers();
            }, 1000);
        });
        socket.on('leftWaitingRoom', () => {
            socket.leave('waitingRoom');
            console.log(`User ${socket.id} left the waiting room`);
            removeWaitingUser(waitingUsers, socket.id);
        });

        const tryPairUsers = () => {
            if (waitingUsers.length >= 2) {
                const [user1, user2] = waitingUsers.splice(0, 2);

                const roomId = `${Math.random().toString(36).substr(2, 9)}`;

                const mode = assignMode(modes)

                io.to(user1).emit('joinRoom', roomId, mode.name);
                io.to(user2).emit('joinRoom', roomId, mode.name);

                console.log(`Users ${user1} and ${user2} paired in room ${roomId} in mode ${mode.name}`);
            }
        };

        socket.on('joinChatRoom', (roomName) => {
            socket.join(roomName);
            console.log(`User ${socket.id} joined room ${roomName}`)
        });

        socket.on('leftChatRoom', (roomName) => {
            socket.leave(roomName);
            io.to(roomName).emit('partnerLeft');
            console.log(`User ${socket.id} left room ${roomName}`)
        });

        socket.on('message', (message: Message, roomName) => {
            io.to(roomName).emit('message', {
                from: socket.id,
                message: message,
                time: new Date().toLocaleString()
            });
            console.log(`User ${socket.id} sent a message to room ${roomName}: ${message}`);
        });

        socket.on('disconnect', () => {
            removeWaitingUser(waitingUsers, socket.id);
            console.log(`user disconnected: ${socket.id}`);
        });
    });

    console.log('SocketIO server initialized and connected');
}