/*
pass a dynamic value to the route handler and 
the server will return the value in the response
*/

app.get('/api/users/:id', (req, res) => {
    console.log(req.params)
})

// localhost:3000/api/users/123
// {id: '123'}
// Remember that the value is a string

app.get('/api/users/:id', (req, res) => {
    const parsed_id = parseInt(req.params.id)
    console.log(parsed_id)
    if(isNaN(parsed_id)){
        return res.status(400).send({msg: "Invalid ID"})
    }
})

// if parsed_id is NaN, it will return NaN
// also we can use sendStatus() method to
// send status code with the response
// res.sendStatus(404) is equivalent to res.status(404).send()