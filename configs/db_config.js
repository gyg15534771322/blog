// 引入mongoose
var mongoose = require("mongoose");

const DBURL ='mongodb://127.0.0.1:27017/blog';

// 连接数据库
mongoose.connect(DBURL, function (err) {
  if (err) {
    console.log("数据库连接失败");
  } else {
    console.log("数据库连接成功");
  }
});

module.exports = mongoose;
