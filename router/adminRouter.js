const router = require('koa-router')();
const sideMenu = require('../config/sideMenu.json');
const path = require('path');

const nodeViews = require('../views/nodeViews');
const brandViews = require('../views/brandViews');

router.use(async (ctx,next) => {
	let fileName = path.parse(ctx.url).name;
	ctx.usersInfo = 'admin';
	ctx.sideMenu = sideMenu;
	ctx.fileName = fileName;
	await next();
})

//后台首页
router.get('/',async (ctx,next) => {	
	await ctx.render('admin/index', {
		title: '管理后台首页',
		user: ctx.usersInfo,
		sideMenu: ctx.sideMenu,
		fileName: ctx.fileName
	})	
});
//节点列表
router.get('/nodeList',nodeViews.nodeList)
	//删除节点
	.post('/nodeList',nodeViews.delNode);
//编辑节点
router.get('/editNode',nodeViews.editNode)
	//新增节点
	.post('/editNode',nodeViews.addNode);

//品牌列表
router.get('/brandList',brandViews.brandList)
	//删除品牌
	.post('/brandList',brandViews.delBrand);

//编辑品牌
router.get('/editBrand',brandViews.editBrand)
	//新增品牌
	.post('/editBrand',brandViews.addBrand);

module.exports = router;