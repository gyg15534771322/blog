var express = require("express");
var router = express.Router();
var controller = require("../controllers/adminConstroller");



/* 后台路由 */
router.get("/", controller.index);

// 添加栏目页面
router.get("/itemAdd", controller.itemAdd);
// 添加栏目数据
router.post("/item_Add", controller.item_Add);
// 栏目管理页面
router.get("/itemLuck", controller.itemLuck);
// 删除栏目
router.get("/item_remove/:_id", controller.item_remove);
// 修改栏目数据页
router.get("/itemUpdate/:_id", controller.itemUpdate);
// 修改栏目内容
router.post("/item_Update/:_id", controller.item_Update);

// 添加文章页面
router.get("/userAdd", controller.userAdd);
// 添加文章数据
router.post("/user_Add", controller.user_Add);
// 文章管理页面
router.get("/userLuck/:page", controller.userLuck);
// 文章管理页面
router.get("/userLuck", controller.userLuckOne);
// 文章具体内容页面
router.get("/userOne/:_id", controller.userOne);
// 修改文章具体内容页面
router.get("/userUpdate/:_id", controller.userUpdate);
// 修改文章具体内容
router.post("/user_Update/:_id", controller.user_Update);
// 删除文章 
router.get("/user_remove/:_id", controller.user_remove);

// 添加管理员页面
router.get("/adminAdd", controller.adminAdd);
// 添加管理员
router.post("/admin_Add", controller.admin_Add);
// 管理员管理页面
router.get("/adminLuck", controller.adminLuck);
// 修改管理员页面
router.get("/adminUpdate/:_id", controller.adminUpdate);
// 修改管理员
router.post("/admin_Update/:_id", controller.admin_Update);
// 确认管理员密码
router.get("/admin_mi/:_id", controller.admin_mi);
// 删除管理员
router.get("/admin_remove/:_id", controller.admin_remove);



/* 登录页面 */
router.get("/denglu", controller.denglu);
// 登录管理员
router.post("/adminDenglu", controller.adminDenglu);
// 退出登录
router.get("/admin_tuiDenglu", controller.admin_tuiDenglu);

// 验证码
router.get("/code", controller.code);


// 添加友情链接页面
router.get("/friendUrlAdd", controller.friendUrlAdd);
// 添加友情链接数据
router.post("/friendUrl_Add", controller.friendUrl_Add);
// 友情链接管理页面
router.get("/friendUrlLuck", controller.friendUrlLuck);
// 删除友情链接
router.get("/friendUrl_remove/:_id", controller.friendUrl_remove);
// 修改友情链接页面
router.get("/friendUrlUpdate/:_id", controller.friendUrlUpdate);
// 修改友情链接内容
router.post("/friendUrl_Update/:_id", controller.friendUrl_Update);


module.exports = router;
