const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const contentController = require("../controllers/content.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Auth */
router.post("/login", authController.login);
// router.post("/signup", authController.signup, authMiddleware.isAuthenticated);
router.post("/signup", authController.signup);

/* Content */
router.get("/options", contentController.getOptions);
router.get(
  "/proposals",
  contentController.getProposals,
  authMiddleware.isAuthenticated
);

module.exports = router;
