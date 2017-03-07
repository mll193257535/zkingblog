/**
 * Created by Administrator on 2017/3/7 0007.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');
var settings = require('../settings');
mongoose.connect(settings.url);
mongoose.model('User', new Schema(models.User));
mongoose.model('Article', new Schema(models.Article));
global.Model = function (type) {
    return mongoose.model(type);;
}
