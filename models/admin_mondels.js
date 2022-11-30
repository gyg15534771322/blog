var mongoose = require("../configs/db_config");

// 创建 item 骨架约束
var admin_Schema = new mongoose.Schema({
  name: String,
  password: String,
  imgUrl: String,
  ctime: {
    type: Date,
    default: new Date(),
  },
});

// 创建集合
var admin_model = mongoose.model("admin", admin_Schema);

module.exports = admin_model;
