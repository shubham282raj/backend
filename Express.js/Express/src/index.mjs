import express, { response } from 'express'

const app = express()

const PORT = process.env.PORT || 3000

const mock_users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jack"},
    {id: 3, name: "Adam"}
]

app.get('/', (req, res) => {
    res.status(200).send({msg: "Hello World"})
})

app.get('/api/users', (req, res) => {
    res.send(mock_users)
})

app.get('/api/users/:id', (req, res) => {
    const parsed_id = parseInt(req.params.id)
    console.log(parsed_id)
    if(isNaN(parsed_id)){
        return res.status(400).send({msg: "Invalid ID"})
    }

    const find_user = mock_users.find(user => user.id === parsed_id)
    if(!find_user){
        return res.sendStatus(404);
    }else{
        return res.send(find_user)
    }
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