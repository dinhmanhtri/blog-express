const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validationMiddleware");

// app.use("/post/store", validateMiddleware);

router.get("/new", authMiddleware, blogPostController.getNewPostForm);

router.get("/:id", blogPostController.getPostById);

router.post(
  "/store",
  authMiddleware,
  validateMiddleware,
  blogPostController.storeNewPost
);

module.exports = router;
