
//加载node_modules下的express模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db= require('./db'); //导入db模块
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


//设置我们的app应用的路由架构


var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');



//生成一个express实例 app
var app = express();

//设置模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: settings.cookieSecret,//secret 用来防止篡改 cookie
    key: settings.db,//key 的值为 cookie中保存的键值
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
    resave:true,
    saveUninitialized:true,//是否保存为初始化状态
    store: new MongoStore({ //设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免重启服务器时会话丢失
        // db: settings.db,
        // host: settings.host,
        // port: settings.port,
        url:settings.url
    })
}));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use(logger('dev'));
//用bodyParser解析post请求提交数据


app.use(bodyParser.json());//解析json数据
//解析普通的数据 解析过后的数据放在req.body
app.use(bodyParser.urlencoded({ extended: false }));
//获取cookieParser
app.use(cookieParser());


//设置静态资源的路由
app.use(express.static(path.join(__dirname, 'public')));


//路由映射 路由的设定应该遵循Restful设计原则
app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
