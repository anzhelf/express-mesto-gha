const users = require('express').Router();
const {
  getUsers, createUser, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const login = require('../controllers/login');

users.get('/', getUsers); // возвращает всех пользователей
users.get('/:usersId', getUser); // возвращает пользователя по _id

users.patch('/me', updateUser);// обновляет профиль
users.patch('/me/avatar', updateAvatar);// обновляет аватар

users.post('/signup', createUser); // создаёт пользователя
users.post('/signin', login); // авторизирует пользователя

module.exports = users;
