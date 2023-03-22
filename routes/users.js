const users = require('express').Router();
const {
  getUsers, createUser, getUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

users.get('/', getUsers); // возвращает всех пользователей
users.get('/:usersId', getUser); // возвращает пользователя по _id

users.patch('/me', updateUser);// обновляет профиль
users.patch('/me/avatar', updateAvatar);// обновляет аватар

users.post('/signup', createUser); // создаёт пользователя
users.post('/signin', login); // авторизирует пользователя
//users.get('/me', getMe); //информация о текущщем пользователе

module.exports = users;
