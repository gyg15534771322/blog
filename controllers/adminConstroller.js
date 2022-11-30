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

//引入md5 加密模块
var md5 = require("md5");
//引入fs 文件模块
var fs = require("fs");





// 主页
con.index = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	// 响应页面
	res.render("admin/index");
};

// 添加栏目页面
con.itemAdd = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	// 响应页面
	res.render("admin/itemAdd");
};

// 添加栏目数据
con.item_Add = function (req, res) {
	item_model.create(req.body, function (err) {
		if (err) {
			res.send("添加栏目数据失败");
		} else {
			res.redirect("/admin/itemLuck");
		}
	});
};

// 栏目管理页面
con.itemLuck = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}

	// 页数
	var page = req.query.page ? req.query.page : 1;

	// 每页多少条
	var pagenum = 3;

	item_model.find({}).count(function (err, mun) {
		if (err) {
			res.send("查看栏目总条数失败");
		} else {
			// 一共多少页
			var pageMax = Math.ceil(mun / pagenum);

			item_model
				.find({})
				.skip(pagenum * (page - 1))
				.limit(pagenum)
				.exec(function (err, data) {
					if (err) {
						res.send("查看文章数据失败");
					} else {
						if (page < 1) page = 1;
						if (page > pageMax) page = pageMax;

						// 一共多少页
						data["pageMax"] = pageMax;
						// 页数
						data["page"] = page;
						// 响应页面
						res.render("admin/itemLuck", { items: data });
					}
				});
		}
	});
};

// 删除栏目
con.item_remove = function (req, res) {
	item_model.findByIdAndRemove(req.params._id, function (err) {
		if (err) {
			res.send("删除栏目数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/itemLuck");
		}
	});
};

// 修改栏目页面
con.itemUpdate = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	item_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找修改栏目项数据失败");
		} else {
			// 响应页面
			res.render("admin/itemUpdate", { item: data });
		}
	});
};

// 修改栏目内容
con.item_Update = function (req, res) {
	item_model.findByIdAndUpdate(req.params._id, req.body, function (err, data) {
		if (err) {
			res.send("修改栏目数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/itemLuck");
		}
	});
};

// 添加文章页面
con.userAdd = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	item_model.find({}, function (err, data) {
		if (err) {
			res.send("查看栏目数据失败");
		} else {
			// 响应页面
			res.render("admin/userAdd", { items: data });
		}
	});
};

// 添加文章数据
con.user_Add = function (req, res) {
	user_model.create(req.body, function (err, data) {
		if (err) {
			res.send(err);
		} else {
			res.redirect("/admin/userAdd");
		}
	});
};

// 文章管理页面 one
con.userLuckOne = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	// 响应页面
	res.redirect("/admin/userLuck/1");
};

// 文章管理页面
con.userLuck = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}

	// 页数
	var page = req.params.page;

	// 每页多少条
	var pagenum = 3;

	user_model.find({}).count(function (err, mun) {
		if (err) {
			res.send("查看总条数失败");
		} else {
			// 一共多少页
			var pageMax = Math.ceil(mun / pagenum);

			user_model
				.find({})
				.skip(pagenum * (page - 1))
				.limit(pagenum)
				.populate("itemId", { name: 1 })
				.exec(function (err, data) {
					if (err) {
						res.send("查看文章数据失败");
					} else {
						// 一共多少页
						data["pageMax"] = pageMax;
						// 页数
						data["page"] = page;
						// 响应页面
						res.render("admin/userLuck", { users: data });
					}
				});
		}
	});
};

// 文章具体内容页面
con.userOne = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	user_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找文章具体内容数据失败");
		} else {
			// 响应页面
			res.render("admin/userOne", { user: data });
		}
	});
};

// 修改文章具体内容页面
con.userUpdate = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	user_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找修改文章数据失败");
		} else {
			item_model.find({}, function (err, data1) {
				if (err) {
					res.send("查看栏目数据失败");
				} else {
					// 响应页面
					res.render("admin/userUpdate", { user: data, items: data1 });
				}
			});
		}
	});
};

// 修改文章具体内容
con.user_Update = function (req, res) {
	user_model.findByIdAndUpdate(req.params._id, req.body, function (err, data) {
		if (err) {
			res.send("修改文章数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/userLuck");
		}
	});
};

// 删除文章
con.user_remove = function (req, res) {
	user_model.findByIdAndRemove(req.params._id, function (err) {
		if (err) {
			res.send("删除文章数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/userLuck");
		}
	});
};

// 添加管理员页面
con.adminAdd = function (req, res) {
	// 响应页面
	res.render("admin/adminAdd");
};

// 添加管理员
con.admin_Add = function (req, res) {
	var uploadImage = require('../configs/uploads_multer_config');
	// 调用文件上传函数
	var upload = uploadImage('uploads', ['image/jpeg', 'image/gif']).single("imgUrl");

	upload(req, res, function (err) {
		if (err) {
			res.send('接收图片失败');
		} else {
			// 判断验证码
			if (req.session.code != req.body.code) {
				res.send("验证码错误");
				return;
			}
			// 去掉账号两端空格
			req.body.name = req.body.name.trim();

			// 密码加密
			req.body.password = md5(req.body.password);

			req.body.imgUrl = req.file.filename;

			admin_model.create(req.body, function (err, data) {
				if (err) {
					res.send('添加管理员数据失败');
				} else {
					res.redirect("/admin/adminLuck");
				}
			});
		}
	})

};

// 确认管理员密码
con.admin_mi = function (req, res) {
	admin_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找管理员数据失败");
		} else {
			// 判断原密码是否正确
			req.query.password = md5(req.query.password);
			if (req.query.password != data.password) {
				res.send("密码错误");
			} else {
				res.send("密码正确");

			}
		}
	})
};

// 删除管理员
con.admin_remove = function (req, res) {
	admin_model.findByIdAndRemove(req.params._id, function (err) {
		if (err) {
			res.send("删除管理员数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/adminLuck");
		}
	});
};

// 管理员管理页面
con.adminLuck = function (req, res) {
	// if (!req.session.user) {
	// 	res.redirect("/admin/Denglu");
	// }

	// 页数
	var page = req.query.page ? req.query.page : 1;

	// 每页多少条
	var pagenum = 3;

	admin_model.find({}).count(function (err, mun) {
		if (err) {
			res.send("查看管理员总条数失败");
		} else {
			// 一共多少页
			var pageMax = Math.ceil(mun / pagenum);

			admin_model
				.find({})
				.skip(pagenum * (page - 1))
				.limit(pagenum)
				.exec(function (err, data) {
					if (err) {
						res.send("查看管理员数据失败");
					} else {
						if (page < 1) page = 1;
						if (page > pageMax) page = pageMax;

						// 一共多少页
						data["pageMax"] = pageMax;
						// 页数
						data["page"] = page;
						// 响应页面
						res.render("admin/adminLuck", { admin: data });
					}
				});
		}
	});
};

//修改管理员信息页面
con.adminUpdate = function (req, res) {
	admin_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找管理员数据失败");
		} else {
			// 响应页面
			res.render("admin/adminUpdate", { admin: data });
		}
	});
}

//修改管理员信息
con.admin_Update = function (req, res) {
	var uploadImage = require('../configs/uploads_multer_config');
	// 调用文件上传函数
	var upload = uploadImage('uploads', ['image/jpeg', 'image/gif']).single("imgUrl");

	upload(req, res, function (err) {
		if (err) {
			res.send('接收图片失败');
		} else {
			// 判断验证码
			if (req.session.code != req.body.code) {
				res.send("验证码错误");
				return;
			}
			// 去掉账号两端空格
			req.body.name = req.body.name.trim();

			// 密码加密
			req.body.password = md5(req.body.password);

			// 删除旧头像
			admin_model.findById(req.params._id, function (err, data) {
				if (err) {
					res.send("查找管理员数据失败");
				} else {
					fs.unlink('uploads/' + data.imgUrl, function (err) {
						if (err) {
							res.send('删除旧头像失败');
						} else {
							req.body.imgUrl = req.file.filename;
							admin_model.findByIdAndUpdate(req.params._id, req.body, function (err, data) {
								if (err) {
									res.send('修改管理员数据失败');
								} else {
									res.redirect("/admin/adminLuck");
								}
							});
						}
					})
				}
			})

		}

	})


}

// 登录
con.denglu = function (req, res) {
	// 响应页面
	res.render("admin/denglu");
};

// 管理员登录
con.adminDenglu = function (req, res) {
	// 判断验证码
	if (req.session.code != req.body.code) {
		res.send("验证码错误");
		return;
	}
	// 去掉账号两端空格
	req.body.name = req.body.name.trim();
	// 密码加密
	req.body.password = md5(req.body.password);

	admin_model.findOne({ name: req.body.name }, function (err, data) {
		if (err) {
			res.send("登录失败");
		} else {
			if (!data) {
				res.send("账号不存在");
			} else {
				if (req.body.password != data.password) {
					res.send("密码错误" + req.body.password + "," + data.password);
					return;
				} else {
					req.session.user = data;
					res.redirect("/admin");
				}
			}
		}
	});
};

// 退出登录
con.admin_tuiDenglu = function (req, res) {
	req.session.user = null;
	res.redirect("/admin/Denglu");
};

// 验证码模块
con.code = function (req, res) {
	// 引入验证码模块
	var captchapng = require("captchapng");
	// 生成验证码
	var num = parseInt(Math.random() * 9000 + 1000);
	// 保存验证码
	req.session.code = num;
	var p = new captchapng(80, 34, num);
	p.color(0, 0, 0, 0);
	p.color(80, 80, 80, 255);

	var img = p.getBase64();
	var imgbase64 = new Buffer(img, "base64");

	res.send(imgbase64);
};

// 添加友情链接页面
con.friendUrlAdd = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	// 响应页面
	res.render("admin/friendUrlAdd");
};

// 添加友情链接
con.friendUrl_Add = function (req, res) {
	friendUrl_model.create(req.body, function (err) {
		if (err) {
			res.send("添加友情链接数据失败");
		} else {
			res.redirect("/admin/friendUrlLuck");
		}
	});
};

// 友情链接管理页面
con.friendUrlLuck = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}

	// 页数
	var page = req.query.page ? req.query.page : 1;

	// 每页多少条
	var pagenum = 3;

	friendUrl_model.find({}).count(function (err, mun) {
		if (err) {
			res.send("查看友情链接总条数失败");
		} else {
			// 一共多少页
			var pageMax = Math.ceil(mun / pagenum);

			friendUrl_model
				.find({})
				.skip(pagenum * (page - 1))
				.limit(pagenum)
				.exec(function (err, data) {
					if (err) {
						res.send("查看友情链接数据失败");
					} else {
						if (page < 1) page = 1;
						if (page > pageMax) page = pageMax;

						// 一共多少页
						data["pageMax"] = pageMax;
						// 页数
						data["page"] = page;
						// 响应页面
						res.render("admin/friendUrlLuck", { friendUrl: data });
					}
				});
		}
	});
};

// 删除友情链接
con.friendUrl_remove = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	friendUrl_model.findByIdAndRemove(req.params._id, function (err) {
		if (err) {
			res.send("删除友情链接数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/friendUrlLuck");
		}
	});
};

// 修改友情链接页面
con.friendUrlUpdate = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	friendUrl_model.findById(req.params._id, function (err, data) {
		if (err) {
			res.send("查找修改友情链接项数据失败");
		} else {
			// 响应页面
			res.render("admin/friendUrlUpdate", { friendUrl: data });
		}
	});
};

// 修改友情链接内容
con.friendUrl_Update = function (req, res) {
	if (!req.session.user) {
		res.redirect("/admin/Denglu");
	}
	friendUrl_model.findByIdAndUpdate(req.params._id, req.body, function (err, data) {
		if (err) {
			res.send("修改友情链接数据失败");
		} else {
			// 响应页面
			res.redirect("/admin/friendUrlLuck");
		}
	});
};


// 抛出
module.exports = con;
