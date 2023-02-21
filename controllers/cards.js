//директория controllers/ содержит файлы
//описания моделей пользователя и карточки;

const getCards = (req, res) => {
  return res.status(200).send({});
};

const createCard = (req, res) => {
  return res.status(200).send({});
};

const deleteCard = (req, res) => {
  return res.status(200).send({});
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