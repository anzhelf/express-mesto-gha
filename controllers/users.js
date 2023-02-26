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
    const user = req.body;
    await User.create(user);
    return res.status(201).json(user);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка при попытке создать пользователя' });
  }
};

const getUser = (req, res) => {
  const data = res.send(req);
  console.log(req);
  return data;


  // try {
  //   console.log('консоль', req);
  //   const { usersId } = req.params;
  //   const user = await User.findById(usersId);

  //   return req;
  //   // if (user === null) {
  //   //   return res.status(404).json({ message: 'Пользователь не найден' })
  //   // }
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json(users);
  // }
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