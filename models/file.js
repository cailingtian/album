/**
 * Created by 1 on 2018/6/17.
 */
var fs = require("fs");

exports.getAllAlbums = function(callback){
   //找到所有文件夹
    fs.readdir("./uploads", function(err,files){
        var allAlbums = [];
        (function interator(i){
            if (err){
                callback("没有找到uploads文件夹",null);
            }
            //遍历结束
            if (i == files.length){
                console.log(allAlbums);
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function(err, stats){
                if (err) {
                    callback("找不到文件" + files[i], null);
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                interator(i + 1);
            });
        })(0);
    });
}

//通过文件名，得到所有图片
exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/" + albumName, function(err,files){
        var allImages = [];
        (function interator(i){
            if (err){
                callback("没有找到uploads文件夹",null);
                return;
            }
            //遍历结束
            if (i == files.length){
                console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function(err, stats){
                if (err) {
                    callback("找不到文件" + files[i], null);
                }
                if (stats.isFile()) {
                    allImages.push(files[i]);
                }
                interator(i + 1);
            });
        })(0);
    })
}