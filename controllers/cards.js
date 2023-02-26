const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.log(e);
    return res.status(500).json(cards);
  }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    await Card.create(card);
    return res.status(201).json(card);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {


    //const card = Card.findById(req.params.cardId);
    //console.log('КТО СОЗДАЛ', card.owner.toHexString());
    // if (card === null) {
    //   return res.status(404).json({ message: `Карточка ${req.params.cardId} не найдена` });
    // }
    //await Card.findByIdAndRemove(req.params.cardId);
    //return res.status(200).send({ message: `Карточка ${req.params.cardId} удалена` });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `Произошла ошибка при попытке удалить карточку ${req.params.cardId}` });
  }
};

const likeCard = (req, res) => {
  return res.status(200).send({});
};

const deleteLikeCard = (req, res) => {
  return res.status(200).send({});
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard
}