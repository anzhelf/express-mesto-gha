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
    await User.create({ name, about, avatar });
    return res.status(201).json(req.body);
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
    console.error(e);
    return res.status(500).send({ message: 'Произошла ошибка.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { usersId } = req.params;
    const user = await User.findById(usersId);
    //!user
    if (user === null) {
      return res.status(404).json({ message: `Пользователь по указанному _id: ${usersId} не найден.` });
    }

    return res.status(200).json(user);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const updateAvatar = (req, res) => {
  return res.status(200).send({});
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateAvatar
}