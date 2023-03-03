const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Произошла ошибка.' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).json(user);

  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Переданы некорректные данные при создании.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка при попытке создать пользователя.' });
    }
  }
};

const getUser = async (req, res) => {
  try {
    const { usersId } = req.params;
    const user = await User.findById(usersId);
    //!user
    if (user === null) {
      return res.status(404).send({ message: `Пользователь по указанному _id: ${usersId} не найден.` });
    }

    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'CastError' || e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Передан некорректный id.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка.' });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true });
    return res.status(200).json({ name: name, about: about });

  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Переданы некорректные данные для изменения информации.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка при попытке изменить данные пользователя.' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    console.log(avatar);
    await User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true });
    return res.status(200).json({ avatar: avatar });

  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Переданы некорректные данные для изменения фотографии профиля.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка при попытке изменить фото профиля.' });
    }
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar
}