var http = require("http");

function handler(req, res) {
	console.log("req.headers", req.headers);
	var data = "header=[" + JSON.stringify(req.headers) + "]\n body=[" + req.body + "]" + "\n hello";
	res.end(data);
}

var server = http.createServer(handler)
server.listen(8899);

console.log("start");