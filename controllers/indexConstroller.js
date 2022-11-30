// 控制器
var con = {};

// 引入item数据模型
var item_model = require("../models/item_mondels");
// 引入user数据模型
var user_model = require("../models/user_mondels");
// 引入admin数据模型
var admin_model = require("../models/admin_mondels");
// 引入friendUrl数据模型
var friendUrl_model = require("../models/friendUrl_mondels");
const { numMask } = require("captchapng");



// 主页
con.index = function (req, res) {
  var users = {};
  item_model.find({}, function (err, data) {
    if (err) {
      res.send("查看栏目数据失败");
    } else {
      friendUrl_model.find({}, function (err, data1) {
        if (err) {
          res.send("查看友情链接数据失败");
        } else {
          a(0);
          function a(num) {
            if (num >= data.length) {
              res.render("index", { items: data, friendUrl: data1, users: users, itemId: null });
            } else {
              user_model
                .find({ itemId: data[num]._id })
                .limit(5)
                .exec(function (err, data2) {
                  if (err) {
                    res.send("查看文章数据失败");
                  } else {
                    users[data[num].name] = data2
                    a(num += 1);
                  }
                });
            }

          }

        }
      });
    }
  });
};

// 栏目页
con.item = function (req, res) {
  // 页数
  var page = req.query.page ? req.query.page : 1;

  // 每页多少条
  var pagenum = 8;

  item_model.find({}, function (err, data) {
    if (err) {
      res.send("查看栏目数据失败");
    } else {
      friendUrl_model.find({}, function (err, data1) {
        if (err) {
          res.send("查看友情链接数据失败");
        } else {
          user_model
            .find({ itemId: req.query._id })
            .count(function (err, num) {
              if (err) {
                res.send("查看总条数失败");
              } else {
                // 一共多少页
                var pageMax = Math.ceil(num / pagenum);

                user_model
                  .find({ itemId: req.query._id })
                  .skip(pagenum * (page - 1))
                  .limit(pagenum)
                  .populate("itemId", { name: 1 })
                  .exec(function (err, data2) {
                    if (err) {
                      res.send("查看文章数据失败");
                    } else {
                      // 一共多少页
                      data2["pageMax"] = pageMax;
                      // 页数
                      data2["page"] = page;
                      // 响应页面
                      res.render("item", { items: data, friendUrl: data1, users: data2, itemId: req.query._id });
                    }
                  });
              }
            })

            ;


        }
      });
    }
  });


}

// 模糊搜索
con.sou = function (req, res) {
  // 页数
  var page = req.query.page ? req.query.page : 1;

  // 每页多少条
  var pagenum = 8;

  item_model.find({}, function (err, data) {
    if (err) {
      res.send("查看栏目数据失败");
    } else {
      friendUrl_model.find({}, function (err, data1) {
        if (err) {
          res.send("查看友情链接数据失败");
        } else {
          user_model
            .find({ description: { $regex: req.query.description } })
            .count(function (err, num) {
              if (err) {
                res.send("查看总条数失败");
              } else {
                // 一共多少页
                var pageMax = Math.ceil(num / pagenum);

                user_model
                  .find({ description: { $regex: req.query.description } })
                  .skip(pagenum * (page - 1))
                  .limit(pagenum)
                  .populate("itemId", { name: 1 })
                  .exec(function (err, data2) {
                    if (err) {
                      res.send("查看文章数据失败");
                    } else {
                      // 一共多少页
                      data2["pageMax"] = pageMax;
                      // 页数
                      data2["page"] = page;
                      // 响应页面
                      res.render("sou", { items: data, friendUrl: data1, users: data2, itemId: null ,description: req.query.description});
                    }
                  });
              }
            })

            ;


        }
      });
    }
  });


}
// 内容页
con.user = function (req, res) {
  item_model.find({}, function (err, data) {
    if (err) {
      res.send("查看栏目数据失败");
    } else {
      friendUrl_model.find({}, function (err, data1) {
        if (err) {
          res.send("查看友情链接数据失败");
        } else {
          user_model
            .findById(req.query._id, function (err, data2) {
              if (err) {
                res.send("查看文章数据失败");
              } else {
                res.render("user", { items: data, friendUrl: data1, user: data2, itemId: null });
              }
            });
        }
      });
    }
  });
};



// 抛出
module.exports = con;