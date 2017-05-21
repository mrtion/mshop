/*
 * 品牌相关控制器类
 * 文件件名 brandController.js
 * 包含对象 BrandController	
*/

//加载依赖
const BrandModel = require('../model/brandModel');
const brandModel = new BrandModel();

class BrandController {
	/*
	 * 构造函数
	 * 
	*/
	constructor() {

	}
	/*
	 * 查询品牌列表
	 * param {pageIndex,page,search,sort}
	 *	pageIndex:当前页,page:每页显示的条数,search:搜索的关键字,sort:ID排序方向(DESC:降序,ASC:增序)
	 * return {sts,msg,data:list:{pageIndex,page,totalPage,list:[{brand_id,brand_name}]},code}
	*/
	async getLists(param) {
		let data;
		await brandModel.connect();
		data = await brandModel.queryList(param);
		await brandModel.close();
		return data;
	}
	/*
	 * 新增品牌信息,返回新增后的品牌id
	 * param {brand_name}
	 *	brand_name:品牌名称
	 * return {sts,msg,data:'id',code}
	 *   
	*/
	async addBrand(param) {
		let data;
		await brandModel.connect();
		data = await brandModel.insertInfo(param);
		await brandModel.close();

		if(data.sts){
			data.data = data.data.insertIds;
		}
		return data;
	}
	/*
	 * 根根brand_id删除品牌信息,返回当前删除内容的id
	 * param {brand_ids}
	 *	brand_ids:[] 数组
	 * return {sts,msg,data:[id],code}
	 *   
	*/
	async delBrands(param) {
		let data;
		await brandModel.connect();
		data = await brandModel.delBrands(param);
		await brandModel.close();
		if(data.sts){
			data.data = param.brand_ids;
		}
		return data;
	}
	/*
	 * 根根brand_id更新品牌信息,返回当前更新的品牌id
	 * param {brand_id,brand_name}
	 *	brand_id:品牌id,brand_name:品牌名称
	 * return {sts,msg,data:{id},code}
	 *   
	*/
	async updataBrand(param) {
		let data;
		await brandModel.connect();
		data = await brandModel.updataInfo(param);
		await brandModel.close();

		if(data.sts){
			data.data = data.data.insertIds;
		}
		return data;
	}

}

module.exports = new BrandController();