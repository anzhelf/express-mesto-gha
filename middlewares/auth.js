const jwt = require('jsonwebtoken');
const { CodeError } = require('../statusCode');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(CodeError.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(CodeError.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
