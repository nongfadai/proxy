var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var cookieParser = require('cookie-parser')
var basePath="data/register2";

process.on('uncaughtException', function(e) {
  console.log("server on error");　　
  console.log(e);
});



app.use(cookieParser());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


function logErrors(err, req, res, next) {
  console.log("logErrors");
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, {
      error: 'Something blew up!'
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err
  });
}


app.all('*', function(req, res, next) {
  //console.log("set Header first");
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Cookie");
  //res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //res.header("Access-Control-Request-Headers","Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Cookie");
  //res.header('Set-Cookie','myCookie=test');
  //console.log("req",req);
  var arr = [];
  for (var p in req) {
    arr.push(p);
  }
  //console.log(arr.sort());
  //console.log(req.headers);
  //console.log("node receive reqest " + req.path);
  direct(req, res); //直接转发
});

function getBodyStr(obj){
	var str="";
	var i=0;
	for(var p in obj){
		if(i>0){
			str+="&";
		}
		str+=p+"="+obj[p];
		i=1;
	}
	return str;
}

var request = require("request");
function direct(req, res) {
  //console.log("req.protocol",req.protocol);
  //console.log("req.host",req.host);
  //console.log("req.path",req.path);

  var url =req.protocol+"://"+ req.host+req.path;
  //"http://www.baidu.com";
  var method=req.method;
  
  var body=req.body;
  var bodyStr=getBodyStr(body);
  
  var opt={
	  	url:url,
		method:req.method,
		headers:req.headers,
	  	encoding:null,
		body:bodyStr
	  };
	opt.headers["Accept-Encoding"]="identity";
  //console.log(req.headers);
  var diskPath=basePath+req.path.replace(/\?[\s\S]*$/g,"");
  if(diskPath.match(/[\/|\\]$/g)){
	  diskPath+="index.html";
  }
  request(opt, function(err, response, body) {
    //console.log("body :",body);
    //response.pipe(res);
    //console.log("res",res);
    //console.log("response.headers", response.headers);
	//console.log(response.headers["content-encoding"]);
	var encoding=response.headers["content-encoding"];
	if(encoding=="gzip"){
		console.log("disk path:"+diskPath);
		var zlib = require('zlib');
		zlib.gunzip(body,function(a,b){
				console.log("after gupzip");
				//console.log(arguments.length);
				//console.log(arguments);
				//body=b;
				fs.outputFileSync(diskPath,b);
			});
	}
	
    for (var p in response.headers) {
      //console.log();
      res.header(p, response.headers[p]);
    }
    res.send(body);
	
	
	var fs=require("fs-extra");
	//console.log("disk path:"+diskPath);
	fs.outputFileSync(diskPath,body);

  });
  
//  	var url="http://"+req.host+req.path;
//	console.log(url);
//    var x = request(url,function(err,body,response){
//			console.log("body",body.length);
//		});
//	x.on("response",function(){
//			console.log("on response");
//			 console.log(response.statusCode) // 200
//			 
//			//console.log(arguments);
//		})
    //req.pipe(x)
    //x.pipe(res);
}


var port = 80;
var host = "127.0.0.1";

console.log("app listen host=[" + host + "] on port=[" + port + "]");
app.listen(port, host);