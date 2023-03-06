const User = require('../models/user');
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
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
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

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar,
};
