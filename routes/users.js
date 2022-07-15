const router = require("express").Router();
const UsersModel = require("../models/users");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getAllUsers);

router.get("/:userId", getUser);

router.post("/", createUser);

router.patch("/me", updateUserProfile);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
