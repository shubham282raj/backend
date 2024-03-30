// HTTP Module

const http = require('http')

const server = http.createServer(
    (req, res) => {
        
        if(req.url === '/'){
            res.end('Home page')
        }
        if(req.url === '/about'){
            res.write('Welcome to our about page')
            res.end('About Page')
        }
    }
)

server.listen(5000)