const router = require("express").Router();
const UsersModel = require("../models/users");
const { getAllUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

module.exports = router;
