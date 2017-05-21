/*	
 * 品牌相关显示层类
 * brandViews.js
 * BrandViews
*/

//加载依赖
const brandController = require('../controller/brandController');

class BrandViews {
	/*
	 * 构造函数
	 * 
	*/
	constructor(){

	}
	/*
	 * 品牌列表
	 * 
	*/
	async brandList(ctx, next) {
		let result,
			lists = [],
			param = {
				pageIndex: 1,
				page: 10,
				search: '',
				sort:'ASC'
			};

		//获取列表  
		result = await brandController.getLists(param);

		if(result.sts && result.data.length > 0){
			lists = result.data;
		}

		await ctx.render('admin/brand/brandList', {
			title: '管理后台品牌列表',
			user: ctx.usersInfo,
			sideMenu: ctx.sideMenu,
			fileName: ctx.fileName,
			lists: lists
		})	
	}
	/*
	 * 删除品牌
	 * 
	*/
	async delBrand(ctx, next) {
		let result,
			ids;
		ids = ctx.request.body.brand_ids;
		result = await brandController.delBrands({brand_ids:ids});
		ctx.body = result;
	}
	/*
	 * 编辑品牌
	 * 
	*/
	async editBrand(ctx, next) {
		await ctx.render('admin/brand/editBrand', {
			title: '管理后台编辑品牌',
			user: ctx.usersInfo,
			sideMenu: ctx.sideMenu,
			fileName: ctx.fileName
		})	
	}
	/*
	 * 新增品牌
	 * 
	*/
	async addBrand(ctx, next) {
		let result,
			param = {brand_name: ctx.request.body.brand_name};

		result = await brandController.addBrand(param);
		console.log(result);
		if(result.sts){
			ctx.response.redirect('/admin/brandList');
		}else{
			ctx.body = '添加失败 <a href="/admin/editBrand">重新添加</a>';
		}
	}
}

module.exports = new BrandViews();