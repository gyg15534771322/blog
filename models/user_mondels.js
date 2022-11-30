var mongoose = require("../configs/db_config");

// 创建 user 骨架约束
var user_Schema = new mongoose.Schema(
  {
    title: String, //标题
    itemId: { type: "ObjectId",ref:'item' }, //栏目Id
    author: String, //作者姓名
    content: String, //内容
    description: String, //描述
    created: {
      //当前时间
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: false },
  }
);

// 创建集合
var user_model = mongoose.model("user", user_Schema);

module.exports = user_model;
