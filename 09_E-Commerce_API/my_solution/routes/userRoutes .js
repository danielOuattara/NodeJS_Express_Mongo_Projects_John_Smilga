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
  tokenAuthentication: tokenAuth,
  rolePermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").get(tokenAuth, rolePermissions("admin"), getAllUsers);
router.route("/show-me").get(tokenAuth, showCurrentUser);
router.route("/update-user").patch(tokenAuth, updateUser);
router.route("/update-user-password").patch(tokenAuth, updateUserPassword);
router.route("/:userId").get(tokenAuth, getSingleUser);

//-----------------------------------------------------------------------

module.exports = router;
