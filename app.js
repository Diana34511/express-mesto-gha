const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { BAD_REQUEST } = require('./utils');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62d0452e6ffc4f883e578938',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.all('*', (req, res) => {
  res.status(BAD_REQUEST).send({
    message: 'Неверный путь.',
  });
});

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
  },
);

app.listen(PORT);
