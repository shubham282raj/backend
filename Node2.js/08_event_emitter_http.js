const http = require('http');

// if you go to node documentation, you will
// see that http.Server is an extended class 
// of net.Server which is an extended class
// of EventEmitter

const server = http.createServer();

server.on('request', (req, res) => {
    res.end('Welcome');
});