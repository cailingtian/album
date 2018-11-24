/**
 * Created by 1 on 2018/6/17.
 */
var express = require("express");
var router = require("./controller");
var app = express();
//设置模板引擎
app.set("view engine", "ejs");

//路由中间件
//静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//首页
app.get("/", router.showIndex);
//相册页
app.get("/:albumName", router.showAlbum);
//上传页
app.get("/up", router.showUp);
app.post("/up", router.doPost);

//最后中间件， 404页面
app.use(function(req,res){
    res.render("err");
})



app.listen(3000,"127.0.0.1");
