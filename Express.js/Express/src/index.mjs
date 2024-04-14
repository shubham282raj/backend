import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send({msg: "Hello World"})
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})