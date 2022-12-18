const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("./../controllers/userController");

const {
  tokenAuth,
  rolePermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").get(tokenAuth, rolePermissions("admin"), getAllUsers);
router.route("/showMe").get(tokenAuth, showCurrentUser);

router.route("/updateUser").patch(tokenAuth, updateUser);
router.route("/updateUserPassword").patch(tokenAuth, updateUserPassword);

router.route("/:userId").get(tokenAuth, getSingleUser);

//-----------------------------------------------------------------------

module.exports = router;
