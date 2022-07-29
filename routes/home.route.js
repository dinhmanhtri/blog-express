const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/post.controller");

router.get("/", blogPostController.getAllPost);

module.exports = router;
