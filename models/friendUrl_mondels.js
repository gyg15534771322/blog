var mongoose = require("../configs/db_config");

// 创建 item 骨架约束
var friendUrl_Schema = new mongoose.Schema({
  name: String,
  url: String,
});

// 创建集合
var friendUrl_model = mongoose.model("friendUrl", friendUrl_Schema);

module.exports = friendUrl_model;
