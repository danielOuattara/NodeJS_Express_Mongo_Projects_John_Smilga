const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
} = require("../controllers/authControllers");
const authenticatedUser = require("../middleware/authentication");

const checkTestUser = require("./../middleware/checkTestUser");

//--------------------------------------------------------

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticatedUser, checkTestUser, updateUser);

module.exports = router;
