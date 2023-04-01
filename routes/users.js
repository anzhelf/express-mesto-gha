const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { url, id } = require('../utils/regularExpressions');

users.get('/', auth, getUsers); // возвращает всех пользователей
users.get('/me', auth, getMe); // информация о текущщем пользователе
users.patch('/me', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(url),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), auth, updateUser);// обновляет профиль

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(url),
  }),
}), auth, updateAvatar);// обновляет аватар

users.get('/:usersId', celebrate({
  body: Joi.object().keys({
    id: Joi.string().pattern(id).length(24),
  }),
}), auth, getUser); // возвращает пользователя по _id
module.exports = users;
