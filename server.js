const PORT    = process.env.PORT || 8000;
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const path    = require('path');
const io      = require('socket.io')(http);

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express Setup
app.use(express.static(path.join(__dirname, 'public')));


// Routes 
app.get('/', function(req, res) {
    res.render('index.pug'); 
});

io.on('connection', function(socket){
    console.log('User connected via socket io');

    socket.on('message', function(message){
        io.emit('message', message)
    });
    socket.emit('message',{
        text: 'welcome to socket chat'
    });
});

http.listen(PORT, function(){
    console.log(`application running \nhttp://localhost:${PORT}`);
});