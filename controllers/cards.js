const Card = require('../models/card');
const { CodeError, CodeSucces } = require('../statusCode');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner });
    return res.status(CodeSucces.CREATED).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка.' });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);

    if (card === null) {
      return res.status(CodeError.NOT_FOUND).send({ message: `Карточка ${cardId} не найдена.` });
    }

    await Card.findByIdAndRemove(cardId);
    return res.status(200).send({ message: `Карточка ${cardId} удалена.` });
  } catch (e) {
    if (e.name === 'CastError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Передан некорректный id карточки.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: `Произошла ошибка при попытке удалить карточку ${cardId}.` });
  }
};

const updateLike = async (req, res, method) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (card === null) {
      return res.status(CodeError.NOT_FOUND).send({ message: 'Карточка по указанному id не найдена.' });
    }

    await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user._id } },
      { new: true },
    );

    return res.status(200).send({ likes: card.likes });
  } catch (e) {
    if (e.name === 'CastError') {
      console.error(e);
      return res.status(CodeError.BAD_REQEST).send({ message: 'Передан некорректный id карточки.' });
    }
    console.error(e);
    return res.status(CodeError.SERVER_ERROR).send({ message: 'Произошла ошибка.' });
  }
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');
const deleteLikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
