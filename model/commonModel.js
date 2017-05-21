/*
 * 公用类model下的所有类都继承此类
 * 文件件名 commonModel.js
 * 包含对象 CommonModel
*/

class CommonModel {
	//构造函数
	constructor(mysqlObj){
		this.mysqlObj = mysqlObj;
	}
	/*
	* 开始连库
	**/
	async connect(){
		this.mysqlObj && this.mysqlObj.connect();
	}
	/*
	* 关闭
	**/
	async close(){
		this.mysqlObj && this.mysqlObj.close();
	}
}

module.exports = CommonModel;