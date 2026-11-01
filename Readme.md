# Личный проект «Шесть городов»

## Запуск приложения

Установите зависимости командой `npm install`. Скопируйте `.env-example` в `.env`
и заполните настройки:

* `PORT` — порт приложения;
* `DB_HOST` — IP-адрес сервера базы данных;
* `SALT` — непустая строка со случайными символами для паролей.

Все три настройки обязательны. Файл `.env` не добавляется в Git.

`npm start` собирает и запускает приложение. `npm run start:dev` выводит
логи в удобном для чтения виде через pino-pretty. Пока приложение только
проверяет настройки и сообщает об инициализации, сервер ещё не запускается.
Команды для работы с тестовыми данными запускаются через `npm run cli -- --help`.

Класс приложения находится в `src/application.ts`, общие компоненты — в
`src/shared`. У логера и настроек есть интерфейсы. Контейнер в
`src/shared/container` связывает интерфейсы с классами и передаёт зависимости.

* Студент: [Екатерина Платонова](https://up.htmlacademy.ru/univer-nodejs-api/7/user/2724179).
* Наставник: `
Глеб
Клецков`.

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## MongoDB и импорт данных

Запустите MongoDB и интерфейс mongo-express:

```bash
docker compose up -d
```

MongoDB будет доступна на порту `27017`, а mongo-express — по адресу
`http://localhost:8081`. Для импорта предложений передайте путь к TSV-файлу и
строку подключения к базе данных:

```bash
npm run cli -- --import ./mocks/test.tsv "mongodb://admin:test@localhost:27017/six-cities?authSource=admin"
```

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).
