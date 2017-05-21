//mysql 数据库连接
const mysql = require('mysql');

const mysqlOption = {
  host: 'localhost',
  user: 'root',
  password : 'root',
  database : 'mshop'
}
const conn = {
	//连接对象
	connection: '',
	/*
	*	开始连库
	*
	**/
	async connect(){
		this.connection = mysql.createConnection(mysqlOption);
		this.connection.connect();
	},
	/*
	*	关闭连连接
	*
	**/
	async close(){
		if(!this.connection){
			this.connection.end();
		}
	},
	/*
	*	查询
	*
	**/
	async query(sql){
		let _this = this;
		return new Promise(function(resolve, reject){
			if(!_this.connection){
				_this.connection = mysql.createConnection(mysqlOption);
				_this.connection.connect();
			}
			_this.connection.query(sql,function(e,data){
				if(e){
					reject('error');
				}else{
					resolve(data);
				}
			})
		})
	},
	/*
	*	新增
	*
	**/
	async insert(sql,param){
		let _this = this;
		return new Promise(function(resolve, reject){
			if(!_this.connection){
				_this.connection = mysql.createConnection(mysqlOption);
				_this.connection.connect();
			}
			_this.connection.query(sql,param,function(e,data){
				if(e){
					reject('error');
				}else{
					resolve(data);
				}
			})
		})
	},
	/*
	*	删除
	*
	**/
	async del(sql,param){
		let _this = this;
		return new Promise(function(resolve, reject){
			if(!_this.connection){
				_this.connection = mysql.createConnection(mysqlOption);
				_this.connection.connect();
			}
			_this.connection.query(sql,param,function(e,data){
				if(e){
					reject('error');
				}else{
					resolve(data);
				}
			})
		})
	},
	async dels(sql){
		let _this = this;
		return new Promise(function(resolve, reject){
			if(!_this.connection){
				_this.connection = mysql.createConnection(mysqlOption);
				_this.connection.connect();
			}
			_this.connection.query(sql,function(e,data){
				if(e){
					reject('error');
				}else{
					resolve(data);
				}
			})
		})
	}
}

module.exports = conn;

