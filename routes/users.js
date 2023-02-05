//директория routes/ содержит описание
// основных роутов для пользователя и карточки.

//создадим новый роутер

const router = require('express').Router();
const { getUsers, getUser, createUsers} = require('../controllers/users');

//положить пути и методы работы с ними
//получить всех пользователей
router.get('/', getUsers);
//создать пользователя
router.post('/', createUsers);
router.get('/:id', getUser);

module.exports = router;