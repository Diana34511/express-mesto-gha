const CardsModel = require("../models/cards");

module.exports.getCards = (req, res) => {
  CardsModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createCard = (req, res) => {
  const { name, link, ownerId, likes } = req.body;

  CardsModel.create({ name, link, owner: ownerId, likes })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
  console.log(req.user._id); // _id станет доступен
};

module.exports.deleteCard = (req, res) => {
  CardsModel.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  CardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
