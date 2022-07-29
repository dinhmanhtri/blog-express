const BlogPost = require("../models/post.model.js");
const path = require("path");

class BlogPostController {
  static getAllPost = (req, res) => {
    BlogPost.find({}, (error, posts) => {
      console.log(req.session);
      console.log(posts);
      res.render("index", {
        blogposts: posts,
      });
    });
  };

  static getPostById = (req, res) => {
    BlogPost.findById(req.params.id, function (error, detailPost) {
      res.render("post", {
        detailPost,
      });
    });
  };

  static getNewPostForm = (req, res) => {
    if (req.session.userId) {
      return res.render("create");
    }
    res.redirect("/user/login");
  };

  static storeNewPost = (req, res) => {
    let image = req.files.image;
    image.mv(
      path.resolve(__dirname, "..", "/public/upload", image.name),
      async (error) => {
        await BlogPost.create(
          {
            ...req.body,
            image: "/upload/" + image.name,
          },
          (err) => {
            res.redirect("/");
          }
        );
      }
    );
  };
}

module.exports = BlogPostController;
