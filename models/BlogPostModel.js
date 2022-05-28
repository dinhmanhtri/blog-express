const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema ({
  title: String,
  body: String,
  username: String,
  datePosted: {// có thể khai báo kiểu thuộc tính với object vì chúng ta cần 'default'
    type: Date,
    default: new Date()
  },
  image: String
}); // Schema định nghĩa các thuộc tính của model

const BlogPost = mongoose.model('BlogPost', BlogPostSchema); // BlogPost - tên collection
module.exports = BlogPost; // export để các class khác có thể dùng được