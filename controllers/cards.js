const Card = require('../models/card');
const { CodeError, CodeSucces } = require('../statusCode');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.json(cards);
  } catch (e) {
    const err = new Error('Произошла ошибка');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner });
    return res.status(CodeSucces.CREATED).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new Error('Переданы некорректные данные при создании карточки.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const admin = req.user._id;
  try {
    const card = await Card.findById(cardId);

    if (card === null) {
      const err = new Error(`Карточка ${cardId} не найдена.`);
      err.statusCode = CodeError.NOT_FOUND;
      next(err);
    }

    const owner = card.owner.toHexString();

    if (owner !== admin) {
      const err = new Error('Можно удалять только свои карточки.');
      err.statusCode = 403;
      next(err);
    }

    await Card.findByIdAndRemove(cardId);
    return res.send({ message: `Карточка ${cardId} удалена.` });
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new Error('Передан некорректный id карточки.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error(`Произошла ошибка при попытке удалить карточку ${cardId}.`);
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
  }
};

const updateLike = async (req, res, method, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user._id } },
      { new: true },
    );

    if (card === null) {
      const err = new Error('Карточка по указанному id не найдена.');
      err.statusCode = CodeError.NOT_FOUND;
      next(err);
    }

    return res.send({ likes: card.likes });
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new Error('Передан некорректный id карточки.');
      err.statusCode = CodeError.BAD_REQEST;
      next(err);
    }
    const err = new Error('Произошла ошибка.');
    err.statusCode = CodeError.SERVER_ERROR;
    return next(err);
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
