// patch request - updates a entry in a record
//              - say just change name of a user
//              - but leave each key in the user as it was
// put request - update the entire record
//              - make a new entry of the user

app.put("/api/users/:id", (req, res) => {
    const { body, params: {id}} = req;

    const parsed_id = parseInt(id);

    if(isNaN(parsed_id))
        return res.sendStatus(400);

    const find_user_index = mock_users.findIndex(
        (user) => user.id === parsed_id
    );

    console.log(find_user_index)
    
    if (find_user_index === -1)
        return res.sendStatus(404);

    mock_users[find_user_index] = {
        ...body,
        id: parsed_id
    }

    console.log(mock_users)
    return res.sendStatus(200);
})