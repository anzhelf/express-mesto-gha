const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json(users);
  }
};

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    return res.status(201).json(user);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const { usersId } = req.params;
    const user = await User.findById(usersId);
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(users);
  }
};

const updateUser = (req, res) => {
  return res.status(200).send({});
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