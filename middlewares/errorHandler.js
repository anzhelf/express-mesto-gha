const { CodeError } = require('../statusCode');

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 404;
//   }
// }

const errorHandler = (req, res, next, err) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = CodeError.SERVER_ERROR, message } = err;
  console.log('ERRRRRRRRRAAAAAA', err);
  console.log('ERRRRRRRRRAAAAAA', res.status);
  res.status(CodeError.SERVER_ERROR).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = errorHandler;
