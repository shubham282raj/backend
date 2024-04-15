// update an entity of a record partially
// unlike put request put request which 
// update each and every field of the user

app.patch("/api/users/:id", (req, res) => {
    const { body, params: {id} } = req;
    const parsed_id = parseInt(id);

    if (isNaN(parsed_id))
        return res.sendStatus(400);

    const find_user_index = mock_users.findIndex(
        (user) => user.id === parsed_id
    );

    if (find_user_index === -1)
        return res.sendStatus(404);

    mock_users[find_user_index] = {
        ...mock_users[find_user_index],
        ...body,
        id: parsed_id
    }

    console.log(mock_users)
    return res.sendStatus(200);
})