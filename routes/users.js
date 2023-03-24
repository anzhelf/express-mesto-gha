const users = require('express').Router();
const {
  getUsers, createUser, getUser, updateUser, updateAvatar, login, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

users.post('/signup', createUser); // создаёт пользователя
users.post('/signin', login); // авторизирует пользователя

users.get('/', auth, getUsers); // возвращает всех пользователей
users.get('/me', auth, getMe); // информация о текущщем пользователе

users.get('/:usersId', auth, getUser); // возвращает пользователя по _id

users.patch('/me', auth, updateUser);// обновляет профиль
users.patch('/me/avatar', auth, updateAvatar);// обновляет аватар

module.exports = users;
