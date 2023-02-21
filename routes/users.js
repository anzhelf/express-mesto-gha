const users = require('express').Router();
const { getUsers, createUser, getUser, updateUser, updateAvatar } = require('../controllers/users');


users.get('/', getUsers); //возвращает всех пользователей

//В теле POST-запроса на создание пользователя
//передайте JSON-объект
//с тремя полями: name, about и avatar.
users.post('/', createUser); //создаёт пользователя
users.get('/:usersId', getUser); //возвращает пользователя по _id


users.patch('/me', updateUser);//обновляет профиль
users.patch('/me/avatar', updateAvatar);//обновляет аватар

module.exports = users;