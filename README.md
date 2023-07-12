[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Бекенд для проекта Mesto!

Продолжение работы над проектом [Mesto](https://github.com/anzhelf/mesto-react).

Создан сервер на express, схемы mongoDB для карточек и пользователей.
Прописаны роутеры для добавления, обновления и удаления данных.

Общая функциональность:

- Можно обновлять данные пользователя(аватар, имя, информацию о себе);
- Можно регистрировать и авторизировать пользователя.
- Можно добавлять новые карточки, лайкать их или удалять;
- В каждом роутере реализованна обработка ошибок;
- проект собран при помощи Webpack;
- В проекте работает eslint и editorConfig.

#### Для разработки используется: JavaScript, nodeJS, express, mongoose, mongoDB, API, Webpack.

Проект был разработан в рамках учебного задания на платформе Яндекс.Практикум. Все работы проверяются менторами и проходят код-ревью.

Команды терминала для работы с сервером:

- клонировать проект к себе на компьютер: git clone git@github.com:anzhelf/express-mesto-gha.git
- установить зависимости: npm install
- запуск сервера в режиме разработки: npm run dev
- запуск сервера: npm run start
- запуск eslint: npm run lint

Продолжение работы над проектом:

- [Репозиторий для деплоя проекта Mesto на сервер Фронтенд + Бекенд](https://github.com/anzhelf/react-mesto-api-full-gha).
