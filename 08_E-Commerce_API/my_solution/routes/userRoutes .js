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
  adminAuth,
  userAuth,
  authorizedPermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router.route("/").get(userAuth, authorizedPermissions("admin"), getAllUsers);
router.route("/showMe").get(userAuth, showCurrentUser);

router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:userId").get(userAuth, getSingleUser);

//-----------------------------------------------------------------------

module.exports = router;
