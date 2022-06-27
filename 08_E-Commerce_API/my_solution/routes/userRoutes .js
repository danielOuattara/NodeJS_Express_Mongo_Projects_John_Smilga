const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("./../controllers/userController");

const { adminAuth, userAuth } = require("./../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").get(userAuth, adminAuth, getAllUsers);
router.route("/showMe", showCurrentUser);

router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:userId").get(userAuth, getSingleUser);
module.exports = router;
