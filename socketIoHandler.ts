import { Server } from 'socket.io';
import type { Message } from './src/types';

const waitingUsers: string[] = [];

function removeWaitingUser(waitingUsers: string[], username: string) {
    const index = waitingUsers.indexOf(username);
    if (index !== -1) {
        waitingUsers.splice(index, 1);
    }
}

export default function setUpSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.emit('name', socket.id);
        console.log(`new user connected: ${socket.id}`);
        console.log(socket.id)
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

                io.to(user1).emit('joinRoom', roomId);
                io.to(user2).emit('joinRoom', roomId);

                console.log(`Users ${user1} and ${user2} paired in room ${roomId}`);
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