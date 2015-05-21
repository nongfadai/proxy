var fs=require("fs"),
watch = require('watch'),
childProcess = require('child_process'),

serverName="server.js",

server = childProcess.fork(serverName, ['normal']);//子进程启动server

//监听config文件的改动
fs.watchFile(serverName, serverChange);

server.on('uncaughtException', function(e) {
    console.log("master on error");
　　console.log(e);
    serverChange();
});

process.on('exit', function () {
　　console.log('master exit!');
　　console.log('Bye.');
});

process.on('uncaughtException', function(e) {
    console.log("master on error");
    console.log(e);
    serverChange();
});

function serverChange(){
    console.log("master: ","server change!");
    killServer();
    
    server = childProcess.fork(serverName, ['normal']);
    console.log("master: ","new server is built!");
}

function killServer(){
     try{
         process.kill(server.pid);
     }catch(ex){
         console.log("master: ",ex);
     }
}