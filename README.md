# Node JS
## 1. Basic

    `const http = require("http")`
- Hàm require có tác dụng import một module vào
tệp đang xử lý. Tham số đầu vào của module được định nghĩa bằng từ khóa export.
- **http** là một phương thức được tích hợp sẵn trong Node.js, nó cung cấp các phương 
thức tương tác với serve như: GET, POST, UPDATE...

```
const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('Xin chao tat ca moi nguoi') // Thông báo kết thúc và truyền dữ liệu đến người dùng
})
```
- Hàm được truyền vào createServer là callback, **req** là đối tượng mà nó nhận
được từ client, **res** là đối tượng mà server sẽ trả về cho trình duyệt.

```
server.listen(3000)
```
- Mỗi server đều phải lắng nghe một port bất kỳ trong dải từ 1 -> 65535
- **port** là một gateway (cửa ngõ) kết lối ra ngoài hoặc giữa các ứng dụng trên server được sử dụng
bởi 1 ứng dụng cụ thể.

## 2. NPM và Express
- npmjs.com là một market các packages, nơi lựa chọn package phù hợp với dự án sử dụng.
- NPM (Node Package Manager) là phần mềm quản lý các packages mà chúng ta download từ npmjs.com.
- Trước khi chạy lệnh cài đặt express dự án cần phải tạo package.json. Đây là file cấu hình
dự án lưu trữ tất cả các thông tin của dự án như: tên dự án, version, các packages sử dụng trong dự án.
- Để tạo ra file package.json gõ lệnh: `npm init`. Sau đó điền các thông tin và gõ "Yes" để xác nhận tạo.
- Sau đó gõ lệnh `npm i express` để cài đặt express.
- Thẻ **dependencies** sẽ chứa tất cả các packages cùng với version lúc cài đặt.
- import express vào ứng dụng: `const express = require('express')`
- Example:
  ```
  const express = require("express")
  const app = express()
  app.listen(3000, () => {
    console.log("App listening on port 3000")
  })
  ```
### Xử lý request với Express
  - Trả về một đối tượng JSON khi nhận được một request:
    ```
    const express = require("express")
    const app = express()
    app.listen(3000, () => {
      console.log("app listen on port 3000")
    })
    app.get('/', (req, res) => {
      res.json({
        name: "Dinh Manh Tri",
        website: "facebook.com"  
      })
    }) // đây gọi là route
    // routing là chúng ta quy ước phần xử lý với một URL nào đó
    ```
  - Sự khác biệt giữa **res.send()** và **res.end()**:
    - res.send() sẽ kiểm tra cấu trúc đầu ra và thiết lập thông tin 
    tiêu đề cho phù hợp.
    - res.end() chỉ có thể trả lời bằng văn bản và nó sẽ không đặt loại
    nội dung.
    - res.end() được sử dụng để nhanh chóng kết thúc phản hồi mà không
    gửi bất kỳ dữ liệu nào. Example:
      ```
      app.get("start-service", (req, res) => {
        exec('./application'); // mã giả
        res.end()
      })
      ```
    - res.end() được sử dụng để gửi dữ liệu trong phản hồi của mình.Ex:
      ```
      app.get("start-service", (req, res) => {
        res.send('{"age":22}');
      })
      ```
      
### Bất đồng bộ với Call Back
- Trong Nodejs Call Back được dùng để xử lý các hàm bất đồng bộ.
- NodeJs cho phép các hàm được thực hiện bất đồng bộ, hàm sau không cần
phải đợi hàm trước thực hiện xong. Tất cả sẽ được cho vào một hàng, task 
nào xong trước thì sử dụng call back để thông báo cho chương trình biết.
- Về lý thuyết bất đồng bộ sẽ chạy nhanh hơn vì tận dụng được thời gian 
nhàn rỗi của CPU.
### Trả về một file HTML cho client
- Để response lại một file html trong ExpressJS, bạn sử dụng **sendFile()** api:
  ```
  // Được gọi khi có request đến "/about"
  app.get("/about", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'))
  })
  // __dirname biểu diễn thư mục chứa đoạn code đang được thực thi.
  // Máy chủ Nodejs sẽ trả về cho client tệp about.html khi nó request tới "/about".
  ```
- **app.get('...')**: Xử lý các yêu cầu HTTP GET. GET là loại quy ước được dùng 
để truy cập server lấy thông tin, tài nguyên, hình ảnh... mà không thay đổi nội dung phía server.
### Trả về static resource (image, css, js...) cho client
- Thư mục public dùng để chứa static resource (tài nguyên tĩnh)
- Chúng ta có thể sử dụng các tệp trong thư mục public mà không phải thông qua router.
  ```
  const express = require("express")
  const app = express()
  const path = require('path')
  // Đăng ký thư mục public
  app.use(express.static("public"))
  app.listen(3000, () => {
    console.log("App listen on port 3000")
  })
  ```
  
### Tạo web app với Express
- Các bước: 
  + Khởi tạo dự án mới bằng câu lệnh: `npm init`.
  + Cài đặt express cho dự án: `npm i express`.
  + Tạo file index.js trong thư mục gốc, viết đoạn code tạo server
  đơn giản:
    ```
    const express = require("express")
    const app = new express()
    app.listen(4000, () => {
        console.log("App listen on port 4000")
    })
    ```
  + Cài đặt **nodemon** để tự khởi động server mỗi khi thay đổi mã nguồn:
    ```
    npm i nodemon --save-dev
    // Tham số --save: mục đích là sau khi cài đặt xong vào thư mục
    node_modules thì cũng thêm thông tin vào mục **dependencies** trong
    package.json
    // Tham số -dev: để thêm vào **devDependencies**
    ```
  + Trong thực tế rất dễ nhầm file nào là file chính của dự án, nên 
  chúng ta sẽ tùy chỉnh lại file _package.json_:
    ```
    "scripts": {
        "start": "nodemon index.js"
    }
    ```
    Từ giờ, mỗi lần khởi động server chỉ cần gõ lệnh: `npm start`
  + Tạo thư mục public chứa các tệp static (html, css, js, ...).
  + Đăng ký thư mục public: `app.use(express.static('public'))`
  + Để có thể xử lý được logic trước khi trả về client, ví dụ như
  cần xác thực xem request có hợp lệ hay không... thì chúng ta bắt 
  buộc phải sử dụng routes.
  + Tạo một thư mục đặt tên là **pages**. Sau đó copy tệp **index.js** vào đó:
    ```
    const express = require('express')
    const app = new express()
    ...
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    })
    ```
  + Sử dụng template engine (EJS, Pug, Handlebar...) để tạo các trang HTML
  linh động hơn, thêm logic xử lý chúng trước khi xuất ra HTML, có thể tái
  sử dụng được những đoạn code.
  + Cài đặt EJS: `npm i ejs --save`
  + Để sử dụng EJS trong dự án, cần khai báo nó với Express: 
    ```
    const express = require("express")
    const app = new express()
    ...
    const ejs = require("ejs")
    app.set('view engine', 'ejs')
    ```
  + Thông qua api: app.set('view engine', 'ejs'), chúng ta thông báo cho 
  ExpressJS biết template engine là EJS, các file có đuôi là .ejs cần phải
  render bằng EJS package.
  + Bây giờ chúng ta thay đổi toàn bộ phần mở rộng html -> ejs
  + Tạo thư mục views ngang cấp với thư mục public cho toàn bộ file .ejs vào.
  + Với ejs chúng ta thay đổi lại route như sau: 
    ```
    app.get('/', (req, res) => {
        res.render('index')
    })
    ```
    ExpressJS sẽ tìm trong thư mục _"views"_ xem có tệp index.ejs không? Nếu
    có thì generate ra HTML với sự trợ giúp của EJS engine.
  + Chia layout: Tạo một thư mục layouts trong views. Tìm những thành phần có
  thể xuất hiện ở các màn hình khác cho vào các file trong layouts (header.ejs, navbar.ejs, ...).
    ```
    <%- include("layouts/header") -%>
    ```
    
## 3. Database (MongoDB, Postgresql)
### Giới thiệu:
- CSDL quan hệ (Relational Database Management System) có khái niệm bảng, các CSDL quan 
hệ (như MySQL hay SQL Server...) sử dụng các bảng để lưu dữ liệu.
- NoSQL (None-Relational SQL) là 1 dạng CSDL mã nguồn mở nó bổ sung thêm
cho những hạn chế của RDBMS về tốc độ, tính năng, khả năng mở rộng.
- NoSQL bỏ qua tính toàn vẹn của dữ liệu để đổi lấy hiệu suất nhanh và khả
năng mở rộng.
- Với Node.js: SQL thường hay sử dụng Postgresql, NoSQL hay sử dụng MongoDB.
- MongoDB là hệ quản trị CSDL mã nguồn mở, là CSDL thuộc NoSQL.
### Kiến trúc của MongoDB
- Thông tin được lưu trữ trong document kiểu JSON thay vì dạng bảng như
CSDL quan hệ.
- Trong MongoDB có khái niệm Collection, một collection sẽ tương ứng với
khái niệm table trong CSDL quan hệ.
- Collection sẽ chứa documents. Mỗi một document sẽ tương ứng với một 
record, được biểu diễn dưới dạng JSON.
- Ví dụ: một sản phẩm sách có những thông tin như: tên sách, ảnh bìa, giá.
Mỗi thông tin được biểu diễn theo cặp key-value. Minh họa một cuốn sách
được lưu trữ trong MongoDB:
  ```
  Database
      -> Books collection
          -> book document
                {
                    price: 20000,
                name: "Đắc nhân tâm"
          image: "https://tiki.com..."
  
  },
  -> book document
  ...
  ```
### Cài đặt MongoDB
- Truy cập: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/ và 
cài đặt theo hướng dẫn.
- Khi cài xong MongoDB service nó sẽ chạy ngầm.
- Để có thể dễ dàng tương tác, tận mắt nhìn dữ liệu được lưu như nào, chỉnh sửa
nó khi cần... thì cần phải cài thêm **MongoDB Compass** hoặc **Robo3T** (khuyến khích).
### Kết nối và quản lý MongoDB với Robo3T:
- Robo3T là một phần mềm mã nguồn mở quản lý MongoDB GUI đa nền tảng.
- Truy cập: https://robomongo.org/download để download Robo3T
- Mở phần mềm lên sẽ hiện ra cửa sổ MongoBD Connections, nhấp vào _Create_ để
tạo một kết nối tới MongoDB service. Nếu kết nối trên localhost thì chỉ cần
điền tên và nhấn _save_.
### Cài đặt Mongoose
- Để Node.js tương tác được với MongoDB thì cần cài thêm module để hỗ trợ.
- Mongoose là một thư viện Object Data Modeling (ODM) hỗ trợ làm cầu nối giữa
Node.js với MongoDB.
- Cài đặt Mongoose: `npm i mongoose`
### Kết nối MongoDB từ Node.js
- Mở _index.js_ và thêm đoạn code:
  ```
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
  ```
- Định nghĩa một connection thông qua api của mongoose đó là: _mongoose.connect()_
với tham số là đường dẫn kết nối DB và tên DB.
- Trong khi kết nối DB, nếu DB chưa tồn tại thì MongoDB sẽ tự động tạo.
### Định nghĩa Model
- Tạo thư mục app (blog/app). 
- Bên trong thư mục app tạo thư mục models - đây là thư mục sẽ chứa các model, là
một Object đại diện cho các Collection trong DB.
- Mỗi models tương ứng với mỗi Collection.
- Tạo BlogPost.js:
  ```
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema;
  const BlogPostSchema = new Schema({
    title: String,
    body: String
  });
  ```
- Model được định nghĩa thông qua Schema Interface.
- Mỗi một Collection trong MongoDB (tương ứng với một table trong SQL) sẽ 
tương ứng với một model.
- Schema sẽ định nghĩa các thuộc tính (các fields) của model.
- Sau khi định nghĩa xong thì cần export nó ra để các class khác có thể dùng được.
- Trong file BlogPost.js:
  ```
  const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
  module.exports = BlogPost 
  ```
- Truy cập vào DB thông qua hàm _mongoose.model(...)_ - trong đó, tham số đầu
tiên là tên của Collection tương ứng với model này.
- **Note**: Mặc dù đặt tên Collection theo số ít, nhưng trong mongoose sẽ tự
động chuyển đổi nó thành số nhiều trong MongoDB.
### Tạo các action CRUD với Mongoose model (test code)
- Tạo một file test.js riêng biệt:
  ```
  const mongoose = require("mongoose")
  const BlogPost = require("./model/BlogPost")
  mongoose.connect('mongodb://localhost/test_my_db', {useNewUrlParser: true});
  BlogPost.create({
    title: "Đây là sách học lập trình Node.js từ cơ bản",
    body: "Nếu bạn đam mê với Javascript thì đây là cuốn sách dành cho bạn."
  }, (error, blogpost) => {
    console.log(error, blogpost)
  })  
  ```
- Đoạn code trên insert thêm một document (hay tương ứng là một record trong
SQL) vào trong Collection.
- Thực thi đoạn code: `node test.js`
- Sau đó kiểm tra Robo3T xem đã thêm được document trên chưa.
#### Lấy dữ liệu từ MongoDB
- Sử dụng hàm **find()** để lấy document trong DB.
- Để lấy tất cả document trong Collection thì ko truyền đk filter lúc query:
  ```
  BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
  })
  ```
- Nếu muốn lọc các document theo một đk thì truyền đk filter vào tham số thứ nhất.
- Lấy ra document có title: "Đây là sách học lập trình Node.js từ cơ bản":
  ```
  BlogPost.find({
    title: "Đây là sách học lập trình Node.js từ cơ bản"
  }, (error, blogpost) => {
    console.log(error, blogpost)
  })
  ```
- Tìm tất cả document mà trong title có từ "Javascript":
  ```
  BlogPost.find({
    title: /Javascript/
  }, (error, blogpost) => {
    console.log(error, blogpost)
  })
  ```
- Tìm hiểu thêm nhiều đk để tìm và lọc documen với _find()_ tại 
đây: https://docs.mongodb.com/manual/tutorial/query-documents/
#### Update document
- Để cập nhật một bản ghi, sử dụng hàm _findByIdAndUpdate(...)_, với id là
tham số đầu tiên để xác định bản ghi cần cập nhật:
  ```
  let id = "62373fbdf20ab798e8825a48";
  BlogPost.findByIdAndUpdate(id, {
    title: 'Update title'
  }, (error, blogpost) => {
    console.log(error, blogpost)
  })
  ```
#### Xóa một document
- Xóa một document sử dụng hàm _findByIdAndDelete(...)_, id của tham số cần xóa:
  ```
  let id = "62373fbdf20ab798e8825a48";
  BlogPost.findByIdAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost);
  })
  ```
