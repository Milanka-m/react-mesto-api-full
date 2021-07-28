# Приложение проекта Mesto бэкенд и фронтенд

Проект включает фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. [Ссылка на сайт](https://projectmesto.milana.nomoredomains.rocks/)

### Используемые технологии:

* создан облачный сервер на платформе Яндекс.Облако и развернут API;
* реализовано логирование запросов и ошибок;
* вся функциональность приложения взаимодействует с собственным API:
    регистрация и авторизация,
    редактирование профиля,
    редактирование аватара,
    добавление/удаление карточки,
    постановка и снятие лайка.
* для разработки серверного кода используется фреймворк express.js;
* взаимодействие с сервером MongoDB;
* для сущностей: пользователь и карточки созданы схемы и модели;
* созданы контроллеры и роуты для пользователей:
    GET /users — возвращает всех пользователей
    GET /users/:userId - возвращает пользователя по _id
    GET /users/me - возвращает информацию о текущем пользователе
    POST /users — создаёт пользователя
    PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
* созданы контроллеры и роуты для карточек:
    GET /cards — возвращает все карточки
    POST /cards — создаёт карточку
    DELETE /cards/:cardId — удаляет карточку по идентификатору
    PUT /cards/:cardId/likes — поставить лайк карточке
    DELETE /cards/:cardId/likes — убрать лайк с карточки 
* создан контроллер login и роут для логина и регистрации:
    POST /signin
    POST /signup
* создан мидлвэр для авторизации, который верифицирует токен из заголовков;
* авторизацией защищены все маршруты кроме страницы регистрации и логина
* реализована централизованная обработка ошибок с помощью celebrate;
* валидация данных на уровне схемы;
* валидация приходящих на сервер запросов.