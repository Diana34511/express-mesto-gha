const {
  VALIDATION_ERROR,
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
} = require('../utils');
const CardsModel = require('../models/cards');

module.exports.getCards = (req, res) => {
  CardsModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;

  CardsModel.create({
    name, link, owner: req.user._id, likes,
  })
    .then((card) => {
      if (card) {
        res.status(SUCCESS).send({ data: card });
        return;
      }

      res.status(BAD_REQUEST).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  CardsModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }

      res.status(BAD_REQUEST).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Карточка с указанным _id не найдена.',
        });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }

      res.status(BAD_REQUEST).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Передан несуществующий _id карточки.',
        });

        return;
      }

      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });

        return;
      }

      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }

      res.status(BAD_REQUEST).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Передан несуществующий _id карточки.',
        });

        return;
      }

      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({
          message: 'Переданы некорректные данные для снятии лайка.',
        });

        return;
      }

      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
