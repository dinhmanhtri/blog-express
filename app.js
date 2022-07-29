const express = require("express");
const app = express();
const expressSession = require("express-session");
const path = require("path");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));
app.use(express.raw());
require("./db/connectDb");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});

app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

const homeRouter = require("./routes/home.route")
app.use("/", homeRouter);

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

const blogPostRouter = require("./routes/post.route");
app.use("/post", blogPostRouter);

app.use((req, res) => res.render("notfound"));
