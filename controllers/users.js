const UsersModel = require("../models/users");

module.exports.getAllUsers = (req, res) => {
  UsersModel.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUser = (req, res) => {
  UsersModel.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UsersModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};