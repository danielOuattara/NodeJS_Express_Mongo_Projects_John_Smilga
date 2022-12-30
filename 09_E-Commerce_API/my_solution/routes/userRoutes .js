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
  tokenAuthentication,
  rolePermissions,
} = require("./../middleware/authentication");

//----------------------------------------------------------------------

router
  .route("/")
  .get(tokenAuthentication, rolePermissions("admin"), getAllUsers);
router.route("/showMe").get(tokenAuthentication, showCurrentUser);

router.route("/updateUser").patch(tokenAuthentication, updateUser);
router
  .route("/updateUserPassword")
  .patch(tokenAuthentication, updateUserPassword);

router.route("/:userId").get(tokenAuthentication, getSingleUser);

//-----------------------------------------------------------------------

module.exports = router;
