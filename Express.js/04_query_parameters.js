// localhost:3000/products?key=value&key2=value2
// this is query string that goes after the route

app.get('/api/users', (req, res) => {
    console.log(req.query)
    res.send(mock_users)
})

// localhost:3000/api/users?filter=John
// Output: {filter: 'John'}
// {filter: 'John'}

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

// localhost:3000/api/users?sort=asc
// returns users sorted in ascending order