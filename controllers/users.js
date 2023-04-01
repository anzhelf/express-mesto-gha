const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CodeError, CodeSucces } = require('../statusCode');
// const errorHandler = require('./middlewares/errorHandler');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (e) {
    const err = new Error('Произошла ошибка.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const {
      name, about, avatar, email,
    } = req.body;
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.status(CodeSucces.CREATED).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new Error('Переданы некорректные данные при создании.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка при попытке создать пользователя.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { usersId } = req.params;
    const user = await User.findById(usersId);

    //! user
    if (user === null) {
      const err = new Error(`Пользователь по указанному _id: ${usersId} не найден.`);
      err.statusCode = CodeError.NOT_FOUND;
      next(err);
    }

    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new Error('Передан некорректный id.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
    return res.json({ name, about });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new Error('Переданы некорректные данные для изменения информации.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка при попытке изменить данные пользователя.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    return res.json({ avatar });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new Error('Переданы некорректные данные для изменения фотографии профиля.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка при попытке изменить фото профиля.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

// проверяем почту и пароль
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      const err = new Error('Неправильные почта или пароль.');
      err.statusCode = CodeError.UNAUTHORIZED;
      next(err);
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      // хеши не совпали — отклоняем промис
      const err = new Error('Неправильные почта или пароль.');
      err.statusCode = CodeError.UNAUTHORIZED;
      next(err);
    }

    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );
    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).send({ message: `Этот токен безопасно сохранен в httpOnly куку: ${token}` });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new Error('Переданы некорректные данные при создании.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка при попытке создать пользователя.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const err = new Error(`Пользователь с id ${req.user._id} не найден`);
      err.statusCode = CodeError.UNAUTHORIZED;
      next(err);
    }

    return res.send(user);
  } catch (e) {
    const err = new Error('Произошла ошибка.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar,
  login,
  getMe,
};
