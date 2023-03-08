// app.js включает основную логику сервера,
// запуск и подключение к базе данных;
// подключаем пакеты
const express = require('express');
const mongoose = require('mongoose');
// const patch = require('path');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { CodeError } = require('./statusCode');

const PORT = 3000;

// создали сервер
const app = express();

// мидлвары для статики
// app.use(express.static(patch.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '63fd6f38cf3cded2dedfc614' };
  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.use('*', (req, res) => res.status(CodeError.NOT_FOUND).send({ message: 'Страница не существует.' }));

// включаем валидацию базы
mongoose.set('runValidators', true);
// соединяемся с базой
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDb');

  // Слушаем порт, подключаем апи
  app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
});
