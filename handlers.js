var globals = require('./globals');
var fs = require('fs');
var mysql = require('mysql');
var qs = require('querystring');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatDB", "root", "");

var Message = sequelize.define('messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'chatDB'
});

connection.connect(function(err){
	if (err) throw err;
});

var returnMessages = function(request, response){
		headers = globals.defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
		response.writeHead(200, globals.defaultCorsHeaders);
		Message.findAll({where: ["message <> ''"]}).success(function(messages){
			response.end(JSON.stringify(messages));
		});
};

var postMessages = function(request, response){
		request.setEncoding();
		response.writeHead(302, globals.defaultCorsHeaders);
			request.on('data', function(data){
				var message = qs.parse(data);
				var newMessage = Message.build(message);
				newMessage.save().success(function() {});
			});
};

var serveFile = function(request, response){
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream(__dirname + '/index.html').pipe(response);
			// read.pipe(fs.readFileSync('index.html', 'utf-8'));
};

var optionsHandler = function(request, response){
	var statusCode = 200;
	var headers = globals.defaultCorsHeaders;
	headers['Content-Type'] = "text/plain";
	response.writeHead(statusCode, headers);
	response.end();
}

exports.GET = returnMessages;
exports.POST = postMessages;
exports.OPTIONS = optionsHandler;
exports.serveFile = serveFile;