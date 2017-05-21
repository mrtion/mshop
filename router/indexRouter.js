const router = require('koa-router')();

router.get('/', async (ctx,next) => {

	await ctx.render('index/index',{
		title: '首页'
	})


})



module.exports = router;