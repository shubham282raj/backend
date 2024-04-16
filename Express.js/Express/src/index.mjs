import express from 'express'
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import { create_user_val_schema } from './utils/validation_schemas.mjs';

const app = express();

app.use(express.json())

const logging_middleware = (req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
}

app.use(logging_middleware);

const resolve_user_id = (req, res, next) => {
    const { params: {id}} = req;
    const parsed_id = parseInt(id);

    if(isNaN(parsed_id))
        return res.sendStatus(400);

    const find_user_index = mock_users.findIndex(
        (user) => user.id === parsed_id
    );

    console.log(find_user_index)
    
    if (find_user_index === -1)
        return res.sendStatus(404);
    
    // assign it to req so that next middleware knows
    // what your find_user_index was
    req.find_user_index = find_user_index
    req.parsed_id = parsed_id

    next()
}

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

app.get('/api/users', 
    query('sort').isString().notEmpty().withMessage("Seems empty"),
    (req, res) => {
    const result = validationResult(req)
    
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


app.post('/api/users', 
    // [
    //     body('username')
    //         .notEmpty()
    //         .withMessage('username cannot be empty')
    //         .isLength({min: 5, max: 32})
    //         .withMessage('username must be at least 5 characters with a max of 32 characters')
    //         .isString()
    //         .withMessage('username must be a string'),
    //     body('name')
    //         .notEmpty()
    //         .withMessage('name cannot be empty')
    //         .isString()
    //         .withMessage('name must be a string')
    // ],
    checkSchema(create_user_val_schema),
    (req, res) => {

    const result = validationResult(req)
    console.log(result)

    if(!result.isEmpty()){
        return res.status(400).send({errors: result.array()})
    }

    // console.log(req.body)
    const data = matchedData(req)

    // const { body } = req

    const new_user = {
        id: mock_users[mock_users.length-1].id + 1,
        ...data
    }

    mock_users.push(new_user)
    
    console.log(mock_users)

    return res.status(201).send(new_user);
})

app.get('/api/users/:id', resolve_user_id, (req, res) => {
    
    const { find_user_index } = req;

    const find_user = mock_users[find_user_index]

    if(!find_user){
        return res.sendStatus(404);
    }else{
        return res.send(find_user)
    }
})

app.put("/api/users/:id", resolve_user_id, (req, res) => {

    const {body, find_user_index, parsed_id} = req

    mock_users[find_user_index] = {
        ...body,
        id: parsed_id
    }

    console.log(mock_users)
    return res.sendStatus(200);
})

app.patch("/api/users/:id", resolve_user_id, (req, res) => {
    
    const {body, find_user_index, parsed_id} = req
    
    mock_users[find_user_index] = {
        ...mock_users[find_user_index],
        ...body,
        id: parsed_id
    }

    console.log(mock_users)
    return res.sendStatus(200);
})

app.delete("/api/users/:id", resolve_user_id, (req, res) => {

    const {find_user_index} = req

    mock_users.splice(find_user_index, 1);

    console.log(mock_users)
    return res.sendStatus(200)
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