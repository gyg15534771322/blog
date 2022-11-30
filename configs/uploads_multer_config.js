// 引入multer 文件上传模块
const multer = require("multer");
//文件模块
var path = require("path");

/**
 * 上传图片
 * @param {String} imagePath  文件保存路径 文件夹
 * @param {Array}  imageTyle  允许上传文件类型
 * */

function uploadImage(imagePath, imageTyle) {
    var storage = multer.diskStorage({
        //保存路径
        destination: function (req, file, cb) {
            cb(null, imagePath);
        },

        //保存在 destination 中的文件名
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + "-" + Date.now() + path.extname(file.originalname)
            );
        },
    });

    function fileFilter(req, file, cb) {
        if (imageTyle.indexOf(file.mimetype) == -1) {
            cb(null, false)
            cb(new Error('请上传正确的图片格式'))
        } else {
            cb(null, true)
        }
    }

    var upload = multer({
        storage: storage,
        fileFilter: fileFilter
    })

    return upload;
}

module.exports = uploadImage;