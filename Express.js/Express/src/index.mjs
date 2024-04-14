import express from 'express'

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000

const mock_users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Jack"},
    {id: 3, name: "Adam"},
    {id: 4, name: "Tina"},
    {id: 5, name: "Henry"},
    {id: 6, name: "Jason"}
]

app.get('/', (req, res) => {
    res.status(200).send({msg: "Hello World"})
})

app.get('/api/users', (req, res) => {
    console.log(req.query)
    const { query: { sort }} = req

    if(!sort){
        return res.send(mock_users)
    }else{
        const sorted_users = mock_users.sort((a, b) => {
            if(sort === 'asc'){
                return a.name > b.name ? 1 : -1
            }else if(sort === 'desc'){
                return a.name < b.name ? 1 : -1
            }else{
                return res.status(400).send({msg: "Invalid Sort Query"})
            }
        })
        return res.send(sorted_users)
    }
})


app.post('/api/users', (req, res) => {
    console.log(req.body)

    const { body } = req

    const new_user = {
        id: mock_users[mock_users.length-1].id + 1,
        ...body
    }

    mock_users.push(new_user)
    
    console.log(mock_users)

    return res.status(201).send(new_user);
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