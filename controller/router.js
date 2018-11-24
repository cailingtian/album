/**
 * Created by 1 on 2018/6/17.
 */
var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var sd = require("silly-datetime");
var fs = require("fs");

exports.showIndex = function(req,res){
  file.getAllAlbums(function(err,allAlbums){
      if (err) {
          res.render("err");
          return;
      }
      res.render("index", {
          "albums" : allAlbums
      });
  })
}


exports.showAlbum = function(req,res,next){
    //遍历相册中的所有图片
    var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function(err,imageArray){
        if (err) {
           next(); //交给下面适合他的中间件
            return;
        }
        res.render("album",{
            "albumname" : albumName,
            "images" : imageArray
        });
    });

}

exports.showUp = function(req,res){
    file.getAllAlbums(function(err,allAlbums){
        if (err) {
            res.render("err");
        }
        res.render("up", {
            albums : allAlbums
        });
    });
}

//上传表单
exports.doPost = function(req, res){
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files, next) {
       console.log(fields);
        console.log(files);
        //改名
        if (err) {
            next(); //这个中间件不受理这个请求，直接往下走
            return;
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        //判断图片尺寸
        var size = parseInt(files.tupian.size);
        if (size > 2048 ){
            res.send("图片尺寸应该小于2M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath, newpath, function(err){
            if (err) {
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });
}





