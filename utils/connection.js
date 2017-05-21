//mysql 数据库连接
const mysql = require('mysql');

const mysqlOption = {
  host: 'localhost',
  user: 'root',
  password : 'root',
  database : 'mshop'
}

let result = {
	sts: false,
	mgs: 'fail',
	data: null,
	code: 0 //0: 数据库连接出错,1: 数据库连接成功
}

let isArray = Array.isArray;

class Conn {
	//构造函数
	constructor(){
		this.connection; //连接对象
	}
	/*
	*	开始连库
	*
	**/
	connect(){
		this.connection = mysql.createConnection(mysqlOption);
		this.connection.connect();
	}
	/*
	*	关闭连连接
	*
	**/
	close(){
		this.connection && this.connection.end();
	}
	/*
	* 查询
	* sql: sql 查询语句, options: [] || {} 数组或对象,
	*
	**/
	query(sql,options){
		let _this = this;
		return new Promise(function(resolve, reject){
			!_this.connection && _this.connect();
			if(typeof options == 'object') {
				_this.connection.query(sql,options,(e,data) => {
					if(e){
						reject(result);
					}else{
						result.sts = true;
						result.code = 1;
						result.mgs = 'success';
						result.data = data;
						resolve(result);
					}
				})
			}else{
				_this.connection.query(sql,(e,data) => {
					if(e){
						reject(result);
					}else{
						result.sts = true;
						result.code = 1;
						result.mgs = 'success';
						result.data = data;
						resolve(result);
					}
				})
			}
		})
	}
}

module.exports = new Conn();

