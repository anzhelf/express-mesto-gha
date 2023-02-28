const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link, owner } = req.body;
    await Card.create({ name, link, owner });
    return res.status(201).json(req.body);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    const admin = '63f4df47fadce55eac0d0811';

    if (card === null) {
      return res.status(404).json({ message: `Карточка ${cardId} не найдена` });
    }

    const owner = card.owner.toHexString();

    //проверка прав
    if (owner !== admin) {
      return res.status(500).json({ message: 'Можно удалять только свои карточки' });
    }

    await Card.findByIdAndRemove(cardId);
    return res.status(200).send({ message: `Карточка ${cardId} удалена` });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: `Произошла ошибка при попытке удалить карточку ${cardId}` });
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