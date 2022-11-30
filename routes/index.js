var express = require('express');
var router = express.Router();
var controller = require("../controllers/indexConstroller");

/* 前台路由. */
router.get("/", controller.index);

/* 栏目路由. */
router.get("/item", controller.item);


/* 文章路由. */
router.get("/user", controller.user);


/* 模糊搜索. */
router.get("/sou", controller.sou);


module.exports = router;
