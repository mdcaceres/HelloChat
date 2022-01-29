const path = require('path');
const express = require('express'); 
const app = express(); 
// setting 
//port config 
//takes system port or 3000 port
app.set('port', process.env.PORT || 3000)

//adding static files 
app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

//websockets
const SocketIO = require('socket.io'); 
const { SocketAddress } = require('net');
const io = SocketIO(server); 

io.on('connection', (socket) => {
    console.log('new connection'+ socket.id);

    socket.on('chat:Message', (data) => {
        console.log(data);
        io.sockets.emit('chat:Message', data); 
    })

    socket.on('chat:typing', (data) => {
        //console.log(data);
        socket.broadcast.emit('chat:typing',data);
    });
});

