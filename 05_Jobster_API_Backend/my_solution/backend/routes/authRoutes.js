const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
} = require("../controllers/authControllers");
const authenticatedUser = require("../middleware/authentication");
//--------------------------------------------------------

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticatedUser, updateUser);

module.exports = router;
