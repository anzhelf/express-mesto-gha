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
    const owner = req.user._id;
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner });
    return res.status(201).json(card);

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
    const admin = req.user._id;
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

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
    if (e.name === 'CastError' || e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Передан некорректный id карточки.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: `Произошла ошибка при попытке удалить карточку ${cardId}.` });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (card === null) {
      return res.status(404).send({ message: 'Карточка по указанному id не найдена.' });
    } else {
      await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
      );

      return res.status(200).send({ likes: card.likes });
    }

  } catch (e) {
    if (e.name === 'CastError' || e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Передан некорректный id карточки.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка.' });
    }
  }
};

const deleteLikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (card === null) {
      return res.status(404).send({ message: 'Карточка по указанному id не найдена.' });
    } else {
      await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
      );

      return res.status(200).send({ likes: card.likes });
    }

  } catch (e) {
    if (e.name === 'CastError' || e.name === 'ValidationError') {
      console.error(e);
      return res.status(400).send({ message: 'Передан некорректный id карточки.' });
    } else {
      console.error(e);
      return res.status(500).send({ message: 'Произошла ошибка.' });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard
}