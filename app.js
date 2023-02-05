//app.js включает основную логику сервера,
// запуск и подключение к базе данных;

//Подключаем пакеты:
const express = require('express');
const mongoose = require('mongoose');
const patch = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/users');

//константа с портом
const PORT = 3000;

//const createPatch = (page) => patch.resolve(__dirname, 'public', `${page}.html`)

//создаем сервер
const app = express();

//запросс через мидлвары чтоб получить статику - нет тут
//обрабатывает главную стр
app.use(express.static(patch.join(__dirname, 'public')));

app.use(bodyParser.json());
//остальные запросы
app.use('/users', router);


//app.use(routes);

//app.use('/users', router);


//запускаем сервер
//порт, колбек - что происходит ответ
//будет вызываться при каждом входящем запросе,
// пришедшем на 3000 порт
app.listen(PORT, (error)=> {
    error ? console.log(error) : console.log(`Приложение слушает на порту ${PORT}!`);
});

//routs
// app.get('/', (req, res) => {
//     res.sendFile(createPatch('home'));
// });
//
// app.get('/contacts', (req, res) => {
//     res.sendFile(createPatch('contacts'));
// });
//
// //миделвар перехватывает запросы - остальные пути - выкидывает ошибку
// app.use((req, res) => {
//     res
//         .status(404)
//         .sendFile(createPatch('error'));
// });

//Он умеет проверять токены
// регистрировать и авторизовывать пользователей,
// сохранять и отдавать карточки,
// запоминать, когда кто-то поставил лайк или передумал и убрал его.
//удалять