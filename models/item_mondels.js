var mongoose = require("../configs/db_config");

// 创建 item 骨架约束
var item_Schema = new mongoose.Schema({
  name: String,
  info: {
    type: String,
    trim: true,
  },
});

// 创建集合
var item_model = mongoose.model("item", item_Schema);

module.exports = item_model;
