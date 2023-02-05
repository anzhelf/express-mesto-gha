const getUsers = (res, req) => {
    return res.status(200).send({getUsers: true});
}

const getUser = (res, req) => {
    return res.status(200).send({getUsers: true});
}

const createUsers = (res, req) => {
    return res.status(200).send({getUsers: true});
}

module.exports = {
    getUsers,
    getUser,
    createUsers
};