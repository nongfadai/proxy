var https = require("https");

function handler(req, res) {
	console.log("req.headers", req.headers);
	var data = "header=[" + JSON.stringify(req.headers) + "]\n body=[" + req.body + "]" + "\n hello";
	res.end(data);
}

const fs = require('fs');

const options = {
  key: fs.readFileSync('./certs/root.key'),
  cert: fs.readFileSync('./certs/root.crt')
};

var server = https.createServer(options,handler)
server.listen(8899);

console.log("start");