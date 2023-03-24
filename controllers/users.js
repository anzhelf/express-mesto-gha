const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CodeError, CodeSucces } = require('../statusCode');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (e) {
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка.' });
  }
};

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { name, about, avatar, email } = req.body;
    const user = await User.create({
      name, about, avatar, email, password: hash
    });
    return res.status(CodeSucces.CREATED).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Переданы некорректные данные при создании.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка при попытке создать пользователя.' });
  }
};

const getUser = async (req, res) => {
  try {
    const { usersId } = req.params;
    const user = await User.findById(usersId);

    //! user
    if (user === null) {
      return res.status(CodeError.NOT_FOUND).send({ message: `Пользователь по указанному _id: ${usersId} не найден.` });
    }

    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Передан некорректный id.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true });
    return res.json({ name, about });
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Переданы некорректные данные для изменения информации.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка при попытке изменить данные пользователя.' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    return res.json({ avatar });
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Переданы некорректные данные для изменения фотографии профиля.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка при попытке изменить фото профиля.' });
  }
};

//проверяем почту и пароль
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      return res.status(401).send({ message: 'Неправильные почта или пароль.' });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      // хеши не совпали — отклоняем промис
      return res.status(401).send({ message: 'Неправильные почта или пароль.' });
    }

    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' }
    );
    return res.send({ token });

  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Переданы некорректные данные при создании.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка при попытке создать пользователя.' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).send({ message: `Пользователь с id ${req.user._id} не найден` });
    }

    return res.send(user);

  } catch (e) {
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка.' });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar,
  login,
  getMe
};
