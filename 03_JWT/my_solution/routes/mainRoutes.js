const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/mainControllers");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
// router.route("/dashboard").get(dashboard);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
