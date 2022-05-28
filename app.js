const express = require("express");
const app = new express();
const expressSession = require("express-session");
const path = require("path");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));
app.use(express.raw());
const database = require("./db/connectDb");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//Đăng ký thư mục public.....
app.use(express.static(path.join(__dirname, "public")));

//Tao server
app.listen(4000, () => {
  console.log("OK. App listening on port 4000");
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

const homeRouter = require("./routes/homeRoutes")
app.use("/", homeRouter);

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

const blogPostRouter = require("./routes/blogPostRoutes");
app.use("/post", blogPostRouter);

app.use((req, res) => res.render("notfound"));
