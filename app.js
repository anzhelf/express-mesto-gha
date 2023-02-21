//app.js включает основную логику сервера,
// запуск и подключение к базе данных;
//подключаем пакеты
const express = require('express');
const mongoose = require('mongoose');
const patch = require('path');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const PORT = 3000;

//создали сервер
const app = express();

//мидлвары для статики
//app.use(express.static(patch.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/users', users);

//соединяемся с базой
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
}, ()=> {
   console.log('Connected to MongoDb');

  // Слушаем порт, подключаем апи
  app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`App listening on port ${PORT}`);
  });
});