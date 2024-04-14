/**

route
base route - localhost:3000/
but we have setup no get route 
so it will return 'cannot get /'

app.get(path, requestHandler))

"api/*" is a good practice to use for api routes

*/

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/', (req, res) => {
    res.send({msg: "Hello World"})
})

app.get('/', (req, res) => {
    res.status(201).send("Hello World")
})

app.get('/api/users', (req, res) => {
    res.send([
        {id: 1, name: "John Doe"},
        {id: 2, name: "Jack"}
    ])
})

app.get('/api/products', (req, res) => {
    res.send([
        {id: 1, name: "Product 1", price: 1000},
        {id: 2, name: "Product 2", price: 2000}
    ])
})