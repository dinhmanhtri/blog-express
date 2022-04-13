const BlogPost = require("../models/BlogPost");
module.exports = (req, res) => {
  BlogPost.findById(req.params.id, function (error, detailPost) {
    res.render("post", {
      detailPost,
    });
  });
};
