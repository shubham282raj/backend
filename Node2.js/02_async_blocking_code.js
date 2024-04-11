const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Home Page')
    } else if (req.url === '/about') {
        // Blocking code
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                console.log(`${i} ${j}`)
            }
        }
        res.end('About Page')
    } else {
        res.end('Error Page')
    }
})

server.listen(5000, () => {
    console.log('Server listening on port : 5000...')
})

// on one tab, if you open about page, the server will
// be blocked and you can't open any other page on 
// any other tab or any other use cannot open any page
// on the server. This is because the server is blocked