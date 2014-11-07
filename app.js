var express = require('express'),
 	app = express(),
 	server = require('http').Server(app),
 	io = require('socket.io')(server);

var port = 3000;



app.use(express.static(__dirname + '/public'));

var history = [];

io.on('connection', function(socket){
	console.log('connection');
	socket.emit('load', history);
	socket.on('draw',function(data){
		history.push(data);
		socket.broadcast.emit('draw',data);
	});
});

server.listen(port, function(){
	console.log('Listening on port: '+ port);	
});