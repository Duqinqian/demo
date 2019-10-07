
var router = function(app){
	var fs = require("fs"); //提供文件目录读取、写等
	var path = require("path");
	var bodyParser = require("body-parser");
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extend:false}));

	var file = path.join(__dirname,'data/pictoral.json');
	var articlefile = path.join(__dirname,'data/article.json');
	var funfile = path.join(__dirname,'data/fun.json');
	var questionfile = path.join(__dirname,'data/question.json');
	var notesfile = path.join(__dirname,'data/notes.json');
	var allfile = path.join(__dirname,'data/all.json');

	var fileData = '';
	var articlefileData = '';
	var funfileData = '';
	var questionfileData = '';
	var notesfileData = '';
	var allfileData = '';

	// 原代码
	fs.readFile(file,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			fileData = JSON.parse(data);
		}
	});

	// 读取历史文章
	fs.readFile(articlefile,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			articlefileData = JSON.parse(data);
		}
	});

	// 读取轶事
	fs.readFile(funfile,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			funfileData = JSON.parse(data);
		}
	});

	// 读取问题
	fs.readFile(questionfile,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			questionfileData = JSON.parse(data);
		}
	});

	// 读取小记
	fs.readFile(notesfile,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			notesfileData = JSON.parse(data);
		}
	});

	// 全部
	fs.readFile(allfile,'utf-8',function(error,data){
		if(error){
			console.log("读取文件失败")
		}else{
			allfileData = JSON.parse(data);
		}
	});
	// 首页(已改完)
	app.post("/article",function(req,res){
		var 
			id = req.body.id,
			list = [];
		if(articlefileData){
			for(var i in articlefileData){
				var temp = {};

				temp.title = articlefileData[i].title;
				temp.abstract = articlefileData[i].abstract;
				temp.img = articlefileData[i].img;
				temp.author = articlefileData[i].author;
				list.push(temp);
			}
			// list = list.concat(list); // 数据太少不够演示，这里重复使用之前的数据
			res.send({"list":list,"code":200,"msg":""});
		}else{
			res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
		}
	});
	//内容、评论页
	app.post("/comment",function(req,res){
		// console.log(req);
		var 
			// _random = Math.floor(Math.random()*3),
			author = req.body.author,
			id = req.body.id,
			list = [],
			data = [];

		if(allfileData){
			for(var i in allfileData){
				var type = allfileData[i].type.split("/")[1];
				var _num = '';
				list.map(function(val,index){
					if(type == val.text){
						_num = index;
						return;
					}
				});

				if(String(_num).length > 0){
					list[_num].dataList.push({
							id:i,
							icon:allfileData[i].icon,
							author:allfileData[i].type.split("/")[0],
							// origin:allfileData[i].genre,
							// img:allfileData[i].content[_random].img
						}
					);
				}else{
					list.push({
						text:type,
						portrait:allfileData[i].portrait,
						dataList:[{
							id:i,
							icon:allfileData[i].icon,
							author:allfileData[i].type.split("/")[0],
							// origin:allfileData[i].genre,
							// img:allfileData[i].content[_random].img
						}]
					});
				}

				data = list;
			}

			if(author || author === 0){
				list = data[author].dataList;
			}
			if(id){
				list = allfileData[id];
			}
			res.send({"list":list,"code":200,"msg":""});
		}else{
			res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
		}
	});
// 发现页（已改完）
	app.post("/things",function(req,res){
		var 
			_random = Math.floor(Math.random()*3),
			author = req.body.author,
			id = req.body.id,
			count = req.body.count||1,
			list = [],
			data = [];
		
		// console.log(count)
			
		if(allfileData){
			for(var i in allfileData){
				var type = allfileData[i].type.split("/")[0];
				var _num = '';

				list.forEach(function(val,index){
					if(type == val.text){
						_num = index;
						return index;
					}
				});
				if(String(_num).length > 0){
					for(let j=0;j<count;j++){
						_random = Math.floor(Math.random()*3)
						list[_num].dataList.push({
								id:i,
								likeNum:0,
								dislikeNum:0,
								icon:allfileData[i].icon,
								author:allfileData[i].content[_random].title,
								img:allfileData[i].content[_random].img,
								desc:allfileData[i].content[_random].desc
								// author:allfileData[i].content.title,
								// img:allfileData[i].content.img,
								// desc:allfileData[i].content.desc
							}
					);
				//   console.log(list[_num])
                  
				}
			}else{
				let dataList=[]
				for(let j=0;j<count;j++){
					_random = Math.floor(Math.random()*3)
					dataList.push({
							id:i,
							likeNum:0,
							dislikeNum:0,
							icon:allfileData[i].icon,
							author:allfileData[i].content[_random].title,
							img:allfileData[i].content[_random].img,
							desc:allfileData[i].content[_random].desc
							// 	author:allfileData[i].content.title,
							// img:allfileData[i].content.img,
							// desc:allfileData[i].content.desc
						})
					
				}
				list.push({
						'text':type,
						'dataList':dataList
					});
				// console.log(list)
				}
			    
				data = list;
			}

			if(author || author === 0){
				list = data[author].dataList;
			}
			if(id){
				list = allfileData[id];
			}
			res.send({"list":list,"code":200,"msg":""});
		}else{
			res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
		}
	});
	// 原代码
	// app.post("/pictoral",function(req,res){
	// 	var list = [];
	// 	if(fileData){
	// 		for(var i in fileData){
	// 			var _num = Math.floor(Math.random()*4);
	// 			var temp = {};
	// 			var _arts =fileData[i].arts[_num];

	// 			temp.title = fileData[i].title;
	// 			temp.icon = fileData[i].icon;
	// 			temp.genre = fileData[i].genre;
	// 			temp.abstract = fileData[i].abstract;
	// 			temp.img = _arts.img;
	// 			temp.originate = _arts.originate;
	// 			list.push(temp);
	// 		}
	// 		list = list.concat(list); // 数据太少不够演示，这里重复使用之前的数据
	// 		res.send({"list":list,"code":200,"msg":""});
	// 	}else{
	// 		res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
	// 	}
	// });
	// 源码
	// app.post("/designer",function(req,res){
	// 	var _random = Math.floor(Math.random()*4),
	// 		author = req.body.author,
	// 		id = req.body.id,
	// 		list = [],
	// 		data = [];

	// 	if(fileData){
	// 		for(var i in fileData){
	// 			var type = fileData[i].title.split("/")[1];
	// 			var _num = '';
	// 			list.map(function(val,index){
	// 				if(type == val.text){
	// 					_num = index;
	// 					return;
	// 				}
	// 			});

	// 			if(String(_num).length > 0){
	// 				list[_num].dataList.push({
	// 						id:i,
	// 						icon:fileData[i].icon,
	// 						author:fileData[i].title.split("/")[0],
	// 						origin:fileData[i].genre,
	// 						img:fileData[i].arts[_random].img
	// 					}
	// 				);
	// 			}else{
	// 				list.push({
	// 					text:type,
	// 					portrait:fileData[i].portrait,
	// 					dataList:[{
	// 						id:i,
	// 						icon:fileData[i].icon,
	// 						author:fileData[i].title.split("/")[0],
	// 						origin:fileData[i].genre,
	// 						img:fileData[i].arts[_random].img
	// 					}]
	// 				});
	// 			}

	// 			data = list;
	// 		}

	// 		if(author || author === 0){
	// 			list = data[author].dataList;
	// 		}
	// 		if(id){
	// 			list = fileData[id];
	// 		}
	// 		res.send({"list":list,"code":200,"msg":""});
	// 	}else{
	// 		res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
	// 	}
	// });

	// 原代码
	// app.post("/things",function(req,res){
	// 	var _random = Math.floor(Math.random()*4),
	// 		author = req.body.author,
	// 		id = req.body.id,
	// 		list = [],
	// 		data = [];
			
	// 	if(fileData){
	// 		for(var i in fileData){
	// 			var type = fileData[i].title.split("/")[0];
	// 			var _num = '';

	// 			list.forEach(function(val,index){
	// 				if(type == val.text){
	// 					_num = index;
	// 					return index;
	// 				}
	// 			});
	// 			if(String(_num).length > 0){
	// 				list[_num].dataList.push({
	// 						id:i,
	// 						likeNum:0,
	// 						dislikeNum:0,
	// 						icon:fileData[i].icon,
	// 						author:fileData[i].title,
	// 						origin:fileData[i].genre,
	// 						img:fileData[i].arts[_random].img
	// 					}
	// 				);
	// 			}else{
	// 				list.push({
	// 					text:type,
	// 					dataList:[{
	// 						id:i,
	// 						likeNum:0,
	// 						dislikeNum:0,
	// 						icon:fileData[i].icon,
	// 						author:fileData[i].title,
	// 						origin:fileData[i].genre,
	// 						img:fileData[i].arts[_random].img
	// 					}]
	// 				});
	// 			}
	// 			data = list;
	// 		}

	// 		if(author || author === 0){
	// 			list = data[author].dataList;
	// 		}
	// 		if(id){
	// 			list = fileData[id];
	// 		}
	// 		res.send({"list":list,"code":200,"msg":""});
	// 	}else{
	// 		res.send({"list":[],"code":10001,"msg":"获取数据失败,请重试."});
	// 	}
	// });
}
module.exports = router;
