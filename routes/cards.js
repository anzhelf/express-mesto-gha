const cards = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, deleteLikeCard } = require('../controllers/cards');

cards.get('/', getCards); //возвращает все карточки

//В теле POST-запроса на создание карточки передайте
//JSON-объект с двумя полями: name и link.
cards.post('/', createCard); //создаёт карточку
cards.delete('/:cardId', deleteCard); //удаляет карточку по идентификатору
//cards.get('/:cardId', deleteCard); //удаляет карточку по идентификатору


//В каждом роуте понадобится _id пользователя,
//совершающего операцию. Получайте его из req.user._id.

//обновление Разрешено частичное обновление профиля.
//Можно передавать в метод
//PATCH только те поля, значения которых нужно изменить.
cards.put('/:cardId/likes', likeCard);//поставить лайк карточке
cards.delete('/:cardId/likes', deleteLikeCard);//убрать лайк с карточки

module.exports = cards;