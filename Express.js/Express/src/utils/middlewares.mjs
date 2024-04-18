const logging_middleware = (req, res, next) => {
  console.log(`${req.method} Request on ${req.url}`);
  next();
};

const resolve_user_id = (req, res, next) => {
    const {
      params: { id },
    } = req;
    const parsed_id = parseInt(id);
  
    if (isNaN(parsed_id)) return res.sendStatus(400);
  
    const find_user_index = mock_users.findIndex((user) => user.id === parsed_id);
  
    console.log(find_user_index);
  
    if (find_user_index === -1) return res.sendStatus(404);
  
    // assign it to req so that next middleware knows
    // what your find_user_index was
    req.find_user_index = find_user_index;
    req.parsed_id = parsed_id;
  
    next();
  };

export { logging_middleware, resolve_user_id};