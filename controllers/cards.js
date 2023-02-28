const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    //const owner = req.user._id;
    const owner = '63fd4fba0143b12aaac47720';
    const { name, link } = req.body;
    //console.log('AAAAAA', owner);
    await Card.create({ name, link, owner });
    return res.status(201).json(req.body);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка.' });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    const admin = '63fd4fba0143b12aaac47720';

    if (card === null) {
      return res.status(404).send({ message: `Карточка ${cardId} не найдена.` });
    }

    const owner = card.owner.toHexString();

    //проверка прав
    if (owner !== admin) {
      return res.status(500).send({ message: 'Можно удалять только свои карточки.' });
    }

    await Card.findByIdAndRemove(cardId);
    return res.status(200).send({ message: `Карточка ${cardId} удалена.` });

  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: `Произошла ошибка при попытке удалить карточку ${cardId}.` });
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