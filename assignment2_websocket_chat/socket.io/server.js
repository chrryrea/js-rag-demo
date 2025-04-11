// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Import the Server class from socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server); // Initialize Socket.IO, passing it the HTTP server

const PORT = process.env.PORT || 3000;

// Serve the index.html file when someone visits the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// --- Socket.IO Logic ---
io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id); // Log when a new client connects

  // Listen for 'disconnect' events
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });

  // Listen for 'chat message' events from a client
  socket.on('chat message', (msg) => {
    console.log('💬 Message received:', msg);
    // Broadcast the message to ALL connected clients (including the sender)
    io.emit('chat message', msg);
  });
});
// --- End Socket.IO Logic ---


// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});