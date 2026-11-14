const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SECRET_CODE = "jarvis123"; 

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Ek naya device connect hua hai!');

    socket.on('verify-code', (code) => {
        if (code === SECRET_CODE) {
            socket.emit('code-success');
        } else {
            socket.emit('code-fail');
            socket.disconnect();
        }
    });

    socket.on('chat-message', (data) => {
        io.emit('broadcast-message', data);
    });

    socket.on('disconnect', () => {
        console.log('Ek user offline ho gaya.');
    });
});

server.listen(3000, () => {
    console.log('GhostNet Server chal pada port 3000 par! 🚀');
});
