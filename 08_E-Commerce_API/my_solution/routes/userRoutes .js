const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} = require("./../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/showMe",showCurrentUser)
router.route("/:userId").get(getSingleUser);
module.exports = router;
