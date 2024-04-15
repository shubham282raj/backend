// you can but need not always provide a body (payload)

app.delete("/api/users/:id", (req, res) => {
    const { params: {id} } = req;

    const parsed_id = parseInt(id);

    if (isNaN(parsed_id))
        return res.sendStatus(400);

    const find_user_index = mock_users.findIndex(
        (user) => user.id === parsed_id
    )

    if (find_user_index === -1)
        return res.sendStatus(404);

    mock_users.splice(find_user_index, 1);

    console.log(mock_users)
    return res.sendStatus(200)
})