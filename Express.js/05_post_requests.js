/*
client -> server
data is sent in the 'body' of the request (payload)
backend will perform some operation on the data
return a response to the client
*/

app.post('/api/users', (req, res) => {
    console.log(req.body)
    return res.sendStatus(200);
})

// this will output 'undefinded' because we haven't
// told express to parse the body of the request

app.use(express.json())
// this is a middleware that will parse 
// the body of the request
// try to keep this line as high as possible in the code
// maybe just after app declaration

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

// this will take input and append it to the mock_users array