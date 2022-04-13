const express = require("express");
const app = new express();
const ejs = require("ejs");
app.set("view engine", "ejs");

const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require('./controllers/login');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Định nghĩa một connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

// Khai báo module express-fileUpload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Đăng ký thư mục public
app.use(express.static("public"));

// Một req được gửi tới server, Express sẽ thực thi tất cả các middleware được đăng ký bởi
// hàm use() trước khi xử lý request đó.
// Tạo middleware:
const customMiddleWare = (req, res, next) => {
  console.log("Custom middle ware called");
  next(); // Mỗi khi middleware này hoàn thành thì sẽ chuyển sang middleware tiếp theo
};
app.use(customMiddleWare);

const validateMiddleware = require("./middleware/validationMiddleware");
app.use("posts/store", validateMiddleware);


app.listen(4000, () => {
  console.log("App listen on port 4000");
});

app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/posts/new", newPostController);

app.get("/post/:id", getPostController);

// Xử lý POST request
app.post("/posts/store", storePostController);

app.get("/auth/register", newUserController);

app.post("/users/register", storeUserController);

app.get("/auth/login", loginController);