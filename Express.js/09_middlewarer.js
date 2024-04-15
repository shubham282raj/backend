// middleware
// middle process between one or many different functions

const logging_middleware = (req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
}

// globally use middleware
app.use(logging_middleware);
// this will call this middleware function everytime
// we call a route before the route is called

app.get('/', logging_middleware, (req, res) => {
    res.status(200).send({msg: "Hello World"})
})
// this is for a particular route

// in both the above examples, there are two middlewares
// because requestHandler is also a middleware
app.get('/path', (req, res, next) => {
    // some logic
    next()
})
// this works as well, its just that we don't need next
// as there is no next middleware to call

// if you want your middleware to check for user auth
// if the user auth is false, you may chose not to
// call next() and just skip the next middleware

// you can have as many middlewares as you want, and 
// call next() to call the next middleware

app.use(logging_middleware, (req, res, next) => {
    console.log("hello")
    next()
});

// this is how you chain 2 middleware globally
// basically by passing 2 functions in app.use()