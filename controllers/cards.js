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
