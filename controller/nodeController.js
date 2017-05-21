/*
 * 品牌相关控制器类
 * 文件件名 nodeController.js
 * 包含对象 NodeController	
*/

//加载依赖
const NodeModel = require('../model/nodeModel');
const nodeModel = new NodeModel();

class NodeController {
	/*
	 * 构造函数
	 * 
	*/
	constructor() {

	}
	/*
	 * 查询节点节列
	 * param {pageIndex,page,search,sort}
	 *	pageIndex:当前页,page:每页显示的条数,search:搜索的关键字,sort:ID排序方向(DESC:降序,ASC:增序)
	 * return {sts,msg,data:list:{pageIndex,page,totalPage,list:[{id,node_name}]},code}
	*/
	async getLists(param) {
		let data;
		await nodeModel.connect();
		data = await nodeModel.queryList(param);
		await nodeModel.close();
		return data;
	}
	/*
	 * 新增节点信息,返回新增后的节点id
	 * param {node_name}
	 *	node_name:节点名称
	 * return {sts,msg,data:'id',code}
	 *   
	*/
	async addNode(param) {
		let data;
		await nodeModel.connect();
		data = await nodeModel.insertInfo(param);
		await nodeModel.close();

		if(data.sts){
			data.data = data.data.insertIds;
		}
		return data;
	}
	/*
	 * 根根node_id删除节点信息,返回当前删除内容的id
	 * param {node_ids}
	 *	node_ids:[] 数组
	 * return {sts,msg,data:[id],code}
	 *   
	*/
	async delNodes(param) {
		let data;
		await nodeModel.connect();
		data = await nodeModel.delNodes(param);
		await nodeModel.close();
		if(data.sts){
			data.data = param.node_ids;
		}
		return data;
	}
	/*
	 * 根根node_id更新节点信息,返回当前更新的节点id
	 * param {id,node_name}
	 *	id:节点id,node_name:节点名称
	 * return {sts,msg,data:{id},code}
	 *   
	*/
	async updataNode(param) {
		let data;
		await nodeModel.connect();
		data = await nodeModel.updataInfo(param);
		await nodeModel.close();

		if(data.sts){
			data.data = data.data.insertIds;
		}
		return data;
	}

}

module.exports = new NodeController();