const UsersModel = require("../models/users");

const VALIDATION_ERROR = 400;
const BAD_REQUEST = 404;

module.exports.getAllUsers = (req, res) => {
  UsersModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUser = (req, res) => {
  UsersModel.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }

      res.status(BAD_REQUEST).send({
        message: "Пользователь по указанному _id не найден.",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR).send({
          message: "Некорректный _id у пользователя.",
        });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UsersModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateUserProfile = (req, res) => {
  UsersModel.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Пользователь с указанным _id не найден.",
        });

        return;
      }
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });

        return;
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateAvatar = (req, res) => {
  UsersModel.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Пользователь с указанным _id не найден.",
        });

        return;
      }
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });

        return;
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};
