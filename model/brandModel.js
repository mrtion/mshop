/*
 * 品牌相关类
 * 文件件名 brandModel.js
 * 包含对象 BrandModel	
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

class BrandModel extends CommonModel {
	/*
	 * 构造函数
	 * 
	*/
	constructor() {
		super(conn); //执行父类并将连接数库对象传入
	}
	/*
	 * 查询品牌列表
	 * param {pageIndex,page,search,sort}
	 *	pageIndex:当前页,page:每页显示的条数,search:搜索的关键字,sort:ID排序方向(DESC:降序,ASC:增序)
	 * return {sts,msg,data:list:{pageIndex,page,totalPage,list:[{brand_id,brand_name}]},code}
	*/
	async queryList(param) {
		let sql  = 'SELECT * FROM brand_table';
		return conn.query(sql);
	}
	/*
	 * 根根 brand_id 查询品牌信息
	 * param {brand_id}
	 * return {sts,msg,data:{brand_id,brand_name},code}
	*/
	async queryInfo(param) {

	}
	/*
	 * 根根brand_id删除品牌信息,返回当前删除内容的id
	 * param {brand_ids}
	 *	brand_ids:[] 数组
	 * return {sts,msg,data:[id],code}
	 *   
	*/
	async delBrands(param) {
		let sql,
			ids;
		if(param && param.brand_ids.length > 0){
			ids = param.brand_ids.join(',');
		}else{
			return new Promise((resolve, reject) => {
				result.sts = false;
				msg = '参数不能为控';
				resolve(result);
			})
		}
		sql = 'DELETE FROM brand_table WHERE brand_id IN ('+ ids +')';
		return conn.query(sql);
	}
	/*
	 * 根根brand_id更新品牌信息,返回当前更新的节点id
	 * param {brand_id,brand_name}
	 *	brand_id:品牌id,brand_name:品牌名称
	 * return {sts,msg,data:{brand_id},code}
	 *   
	*/
	async updataInfo(param) {

	}
	/*
	 * 新增品牌信息,返回新增后的品牌id
	 * param {brand_name}
	 *	brand_name:品牌名称
	 * return {sts,msg,data:{id},code}
	 *   
	*/
	async insertInfo(param) {
		let sql,
			options = [],
			key;
		sql = 'INSERT INTO brand_table(brand_id,brand_name) VALUES (0,?)';
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

module.exports = BrandModel;