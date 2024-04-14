const http = require('http');

// if we want to serve other files like css,
// js, images etc we'll have to import each and 
// give them a path to serve them.
const {readFileSync} = require('fs');
const home = readFileSync('./utils/home.html');
const home_css = readFileSync('./utils/home_css.css');

const server = http.createServer((req, res) => {
    if(req.url === '/'){res.writeHead(
        200,
        {
            'content-type': 'text/html',
        }
    );
    res.write(home);
    res.end();
    }else if(req.url === '/home_css.css'){
        res.writeHead(
            200,
            {
                'content-type': 'text/css',
            }
        );
        res.write(home_css);
        res.end();
    }
});

server.listen(3000);