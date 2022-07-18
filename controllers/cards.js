const VALIDATION_ERROR = 400;
const BAD_REQUEST = 404;

const CardsModel = require("../models/cards");

module.exports.getCards = (req, res) => {
  CardsModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, ownerId, likes } = req.body;

  CardsModel.create({ name, link, owner: ownerId, likes })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCard = (req, res) => {
  CardsModel.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: " Карточка с указанным _id не найдена.",
        });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Передан несуществующий _id карточки.",
        });

        return;
      }

      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные для постановки лайка.",
        });

        return;
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Передан несуществующий _id карточки.",
        });

        return;
      }

      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные для снятии лайка.",
        });

        return;
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};
