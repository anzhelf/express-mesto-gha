const users = require('express').Router();
const {
  getUsers, createUser, getUser, updateUser, updateAvatar, login, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const { url, id } = require('../utils/regularExpressions');

users.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(url),
    about: Joi.string().min(2).max(30),
  })
}), createUser); // создаёт пользователя

users.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), login); // авторизирует пользователя

users.get('/', auth, getUsers); // возвращает всех пользователей
users.get('/me', auth, getMe); // информация о текущщем пользователе

users.get('/:usersId', celebrate({
  body: Joi.object().keys({
    id: Joi.string().pattern(id).length(24)
  })
}), auth, getUser); // возвращает пользователя по _id

users.patch('/me', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(url),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), auth, updateUser);// обновляет профиль

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(url)
  })
}), auth, updateAvatar);// обновляет аватар

module.exports = users;