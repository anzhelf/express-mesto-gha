const cards = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, deleteLikeCard } = require('../controllers/cards');

cards.get('/', getCards); //возвращает все карточки
cards.post('/', createCard); //создаёт карточку
cards.delete('/:cardId', deleteCard); //удаляет карточку по идентификатору

//В каждом роуте понадобится _id пользователя,
//совершающего операцию. Получайте его из req.user._id.

cards.put('/:cardId/likes', likeCard);//поставить лайк карточке
cards.delete('/:cardId/likes', deleteLikeCard);//убрать лайк с карточки

module.exports = cards;