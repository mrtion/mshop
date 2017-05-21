const router = require('koa-router')();


router.get('/',(ctx,next) => {
	ctx.body = {
		status: 1,
		title: 'api',
		msg: 'success'
	}
});


module.exports = router;

