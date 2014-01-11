var express =  require('express');
var http = require("http");
var path = require("path");

var app = express();
var fs = require('fs');

var posts = [];
var titles = 

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


function update(callback){
	fs.readFile('posts/setup.txt', function(e, data){
		if(e){console.log(e);}
		var temp = data.toString().split("\r\n");
		if(temp.toString() == titles.toString()){
			return callback;
		}
		console.log("updating");
		posts = [];
		titles = temp;
		for(var i = 0; i < titles.length; i++){
			if(titles[i].trim()=="" || !fs.existsSync('posts/'+titles[i]+'.html')){
				continue;
			}
			var date = fs.statSync('posts/'+titles[i]+'.html').mtime;
			var data = fs.readFileSync('posts/'+titles[i]+'.html', "utf-8");
			posts.push({
				title: titles[i],
				content: data,
				dateTime: date
			});
		}
	});
	return callback;
}

app.get('/', function(req, res){
	update(res.render('posts', {posts:posts}));
});

app.use(function(req, res, next){
 	res.status(404);
	res.render('404');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
	update();
});

