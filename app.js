require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { handleError } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { limiter } = require('./constants/ratelimiter');

const { PORT = 3000, NODE_ENV, MONGO_DB } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/moviesdb');

app.use(requestLogger);

const options = {
  origin: [
    'http://localhost:3001',
    'https://simoshina.moviebase.nomoredomains.xyz/',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует.')));

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
