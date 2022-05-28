const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

class LoginController {
  static getLoginForm = (req, res) => {
    res.render("login");
  };

  static loginUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            req.session.userId = user._id;
            res.redirect("/");
          } else {
            res.redirect("/user/login");
          }
        });
      } else {
        res.redirect("/user/login");
      }
    });
  };

  static getRegisterForm = (req, res) => {
    res.render("register");
  };

  static storeUser = (req, res) => {
    User.create(req.body, (err, user) => {
      if (err) {
        return res.redirect("/user/register");
      }
      res.redirect("/");
    });
  };

  static logoutUser = (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }
}

module.exports = LoginController;
