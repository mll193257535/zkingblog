var express = require('express');//导入express模块
//router就是 路由模块
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的博客' });
});

module.exports = router;
