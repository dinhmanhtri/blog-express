const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");

router.get("/", blogPostController.getAllPost);

module.exports = router;
