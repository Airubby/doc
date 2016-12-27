var express = require("express");

var app = express();

//静态服务   以/jingtai的才走的中间件   下面新的路由没有影响了
////当你不写路径的时候，实际上就相当于"/"，就是所有网址
app.use(express.static('./public')); //app.use(express.static('./public')); 等价于 app.use("/",express.static('./public'));  这个放上面；如果放app.get('/')下面的话  访问   地址栏/  永远显示哈哈 
app.use("/jingtai", express.static("./public")); //这个放上面，如果放app.get('/')下面的话  访问   地址栏/  永远显示哈哈 

//新的路由
app.get("/images", function(req, res) {
    res.send("哈哈");
});

//会自动识别err参数，如果有，那么就这个函数能捕获err
app.use(function(req, res) {
    res.status(404).send("没有这个页面！");
});

app.listen(3000);


//渲染内容用res.render() 将会根据views中的模板文件进行渲染
//默认是views文件夹，如果想用自己定义的文件夹则写   一般都用views默认的
// app.set("views", "aa");   //如果不想使用views文件夹，用aa文件夹


// app.set("view engine", "ejs");  //为ejs后缀的模板,可以是其它后缀的模板
// app.get("/", function(req, res) {  //默认是views文件夹
//     res.render("haha", { news: [] }); //上面定义了自己的aa文件夹 app.set("views","aa");  则访问的是aa文件夹下面的haha文件  haha.ejs
// });


//app.get()匹配到一个就不会往下执行了；如果想往下匹配的话，那么需要写next() 中间件
//app.use()也是一个中间件。与get、post不同的是，他的网址不是精确匹配的。而是能够有小文件夹拓展的。  比如：http://127.0.0.1:3000/admin/aa/bb/cc/dd
//一般的网站跳转比如a标签都是get请求
//req.originalUrl 输出  /admin/aa/bb/cc/dd
//req.baseUrl 输出  /admin
//req.path  输出 /aa/bb/cc/dd

//res.set('Content-Type', 'text/html');