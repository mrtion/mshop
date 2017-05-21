const Koa = require('koa');
const router = require('koa-router')(); //路由中间件
const views  = require('koa-views') //模板选择中间件
const convert = require('koa-convert'); //将其它类型的中间件传换成koa2 支持的中间件
const json = require('koa-json');   //将js字面量对象转换成真正的json 对象
const bodyparser = require('koa-bodyparser')(); //将请求的body 转成对象中间件
const static =  require('koa-static');  //静态文件中间件
const app = new Koa();

//路由
const index = require('./router/indexRouter');  //前台
const admin = require('./router/adminRouter');   //管理后台
const api =  require('./router/apiRouter'); //API

//middlewares
app.use(json());
app.use(bodyparser);
app.use(static(__dirname + '/public')); //静态文件目录
//选择模板的目录和模板的扩展名
app.use(views(__dirname + '/template',{
    extension: 'pug'
}));

//前台
router.use('/',index.routes(),index.allowedMethods());
//管理后台
router.use('/admin',admin.routes(),admin.allowedMethods());
//api
router.use('/api',api.routes(),api.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888,(err) => {
    if(!err){
        console.log('success')
    }
})