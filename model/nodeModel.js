/*
 * 节点相关类
 * 文件件名 nodeModel.js
 * 包含对象 NodeModel	
*/

//加载依赖
const CommonModel = require('../model/commonModel'); //公共类

const conn = require('../utils/connection.js'); //连接数库工具

//默认返回值
let result = {
	sts:false,	//true/false 查询是成功和失败
	msg:'fail',	//提示信息
	data:null,	//查询后对应的值
	code:'0'	//当前的信息编码
}

class NodeModel extends CommonModel {
	/*
	 * 构造函数
	 * 
	*/
	constructor() {
		super(conn); //执行父类并将连接数库对象传入
	}
	/*
	 * 查询节点节列
	 * param {pageIndex,page,search,sort}
	 *	pageIndex:当前页,page:每页显示的条数,search:搜索的关键字,sort:ID排序方向(DESC:降序,ASC:增序)
	 * return {sts,msg,data:list:{pageIndex,page,totalPage,list:[{id,node_name}]},code}
	*/
	async queryList(param) {
		let sql  = 'SELECT * FROM node_table';
		return conn.query(sql);
	}
	/*
	 * 根根node_id查询节点信息
	 * param {node_id}
	 * return {sts,msg,data:{id,node_name},code}
	*/
	async queryInfo(param) {

	}
	/*
	 * 根根node_id删除节点信息,返回当前删除内容的id
	 * param {node_ids}
	 *	node_ids:[] 数组
	 * return {sts,msg,data:[id],code}
	 *   
	*/
	async delNodes(param) {
		let sql,
			ids;
		if(param && param.node_ids.length > 0){
			ids = param.node_ids.join(',');
		}else{
			return new Promise((resolve, reject) => {
				result.sts = false;
				msg = '参数不能为控';
				resolve(result);
			})
		}
		sql = 'DELETE FROM node_table WHERE id IN ('+ ids +')';
		return conn.query(sql);
	}
	/*
	 * 根根node_id更新节点信息,返回当前更新的节点id
	 * param {id,node_name}
	 *	id:节点id,node_name:节点名称
	 * return {sts,msg,data:{id},code}
	 *   
	*/
	async updataInfo(param) {
		
	}
	/*
	 * 新增节点信息,返回新增后的节点id
	 * param {node_name}
	 *	node_name:节点名称
	 * return {sts,msg,data:{id},code}
	 *   
	*/
	async insertInfo(param) {
		let sql,
			options = [],
			key;
		sql = 'INSERT INTO node_table(id,node_name) VALUES (0,?)';
		if(param){
			for(key in param){
				options.push(param[key]);
			}
		}else{
			return new Promise((resolve, reject) => {
				result.sts = false;
				msg = '参数不能为控';
				resolve(result);
			})
		}
		return conn.query(sql,options);
	}
}

module.exports = NodeModel;