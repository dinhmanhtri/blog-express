const express = require("express");
const router = express.Router();
const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");
const userController = require("../controllers/userController");

// login router
router.get(
  "/login",
  redirectIfAuthenticatedMiddleware,
  userController.getLoginForm
);

router.post(
  "/login",
  redirectIfAuthenticatedMiddleware,
  userController.loginUser
);

// register router
router.get(
  "/register",
  redirectIfAuthenticatedMiddleware,
  userController.getRegisterForm
);

router.post(
  "/register",
  redirectIfAuthenticatedMiddleware,
  userController.storeUser
);

router.get("/logout", userController.logoutUser);

module.exports = router;
