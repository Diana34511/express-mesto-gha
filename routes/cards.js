const router = require("express").Router();
const CardsModel = require("../models/cards");
const { createCard, getCards, deleteCard } = require("../controllers/cards");

router.get("/", getCards);

router.post("/", createCard);

router.delete("/:cardId", deleteCard);

module.exports = router;