const { CodeError } = require('../statusCode');

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.statusCode = 404;
//   }
// }

const errorHandler = (req, res, next, err) => {
  res.status(CodeError.SERVER_ERROR).send({ message: err.message });
}

module.exports = errorHandler;