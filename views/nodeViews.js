/*	
 * 节点相关显示层类
 * nodeViews.js
 * NodeViews
*/

//加载依赖
const nodeController = require('../controller/nodeController');

class NodeViews {
	/*
	 * 构造函数
	 * 
	*/
	constructor(){

	}
	/*
	 * 节点列表
	 * 
	*/
	async nodeList(ctx, next) {
		let result,
			lists = [],
			param = {
				pageIndex: 1,
				page: 10,
				search: '',
				sort:'ASC'
			};

		//获取列表  
		result = await nodeController.getLists(param);
		if(result.sts && result.data.length > 0){
			lists = result.data;
		}
		//渲染模板
		await ctx.render('admin/node/nodeList', {
			title: '管理后台节点列表',
			user: ctx.usersInfo,
			sideMenu: ctx.sideMenu,
			fileName: ctx.fileName,
			lists: lists
		})	
	}
	/*
	 * 删除节点
	 * 
	*/
	async delNode(ctx, next) {
		let result,
		ids;
		ids = ctx.request.body.node_ids;
		result = await nodeController.delNodes({node_ids:ids});
		ctx.body = result;
	}
	/*
	 * 编辑节点
	 * 
	*/
	async editNode(ctx, next) {
		await ctx.render('admin/node/editNode', {
			title: '管理后台编辑节点',
			user: ctx.usersInfo,
			sideMenu: ctx.sideMenu,
			fileName: ctx.fileName
		})	
	}
	/*
	 * 新增节点
	 * 
	*/
	async addNode(ctx, next) {
		let result,
		param = {node_name: ctx.request.body.node_name};

		result = await nodeController.addNode(param);
		console.log(result);
		if(result.sts){
			ctx.response.redirect('/admin/nodeList');
		}else{
			ctx.body = '添加失败 <a href="/admin/editNode">重新添加</a>';
		}
	}
}

module.exports = new NodeViews();