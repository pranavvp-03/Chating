import { Server } from "socket.io";  // Import Server from socket.io
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);  // Create HTTP server using Express app

const io = new Server(server, {  // Correct way to create a Socket.IO instance
    cors: {
        origin: ["http://localhost:5173"],  // Corrected origin URL
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

//used to store onlin users
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId 
    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
     
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

// Do not call server.listen() here, just export the necessary instances
export { io, app, server };
