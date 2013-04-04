var handlers = require('./handlers');
var globals = require('./globals');

var router = function(request, response) {
	console.log("Serving request type " + request.method + " for url " + request.url);
		if(request.url === '/'){
				handlers.serveFile(request, response);
		}	else if (request.url === '/classes/messages'){
			console.log(request.method + ' received');
			handlers[request.method](request, response);
		}	else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('404 yo!');
		}
};

exports.router = router;