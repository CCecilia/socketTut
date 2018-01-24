const PORT    = process.env.PORT || 8000;
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const path      = require('path');

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express Setup
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index.pug'); 
});

http.listen(PORT, function(){
    console.log(`application running \nhttp://localhost:${PORT}`);
});