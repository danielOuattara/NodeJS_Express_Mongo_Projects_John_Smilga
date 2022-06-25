const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("./../controllers/userController");

const { authenticatedUser } = require("./../middleware/authentication");

router.route("/").get(authenticatedUser, getAllUsers);
router.route("/showMe", showCurrentUser);

router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:userId").get(authenticatedUser, getSingleUser);
module.exports = router;
