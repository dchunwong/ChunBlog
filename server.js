var express =  require('express');
var http = require("http");
var path = require("path");

var app = express();
var fs = require('fs');

var posts = [];

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


function update(callback){
	fs.readFile('posts/setup.txt', function(e, data){
		if(e){console.log(e);}
		postData = data.toString().split(/\r\n|\n/);
		console.log(postData);
		console.log("updating");
		for(var i = 0; i < postData.length; i+=3){
			title = postData[i+1];
			date = postData[i];
			console.log(title);
			if(title.trim()=="" || !fs.existsSync('posts/'+title+'.html')){
				continue;
			}
			var data = fs.readFileSync('posts/'+title+'.html', "utf-8");
			posts.push({
				title: title,
				content: data,
				dateTime: date
			});
		}
	});
	return callback;
}

app.get('/', function(req, res){
	res.render('posts', {posts:posts});
});

app.use(function(req, res, next){
 	res.status(404);
	res.render('404');
});

update(http.createServer(app).listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
}));

