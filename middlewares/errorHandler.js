const { CodeError } = require('../statusCode');

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 404;
//   }
// }

const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = CodeError.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === CodeError.SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = errorHandler;
