const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Auth */
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
