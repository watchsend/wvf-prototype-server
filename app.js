var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function getFrame(videoData, offset){
	//Get video data
	fs.readFile(videoData, function(err, data){
		var buf = new Buffer(videoData);
		console.log("The buffer is "+ buf);
		console.log('The buff 32 is '+ buf.readUInt32BE(offset, noAssert=true));
	});
};

//getFrame('video', 0);

function getFirst(videoData){
	fs.readFile(videoData, function(err, data){
		console.log(data);
	});
};


//getFirst('video');



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

