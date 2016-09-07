var express = require('express');
var app = express();



var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/',function(req,res){
	res.render('index');
});

app.get('/selector',function(req,res){
	res.render('selector');
});

app.get('/crear-book',function(req,res){
	res.render('crear_book');
});

app.get('/acerca-de-ti',function(req,res){
	res.render('acerca_de_ti');
});

app.get('/confirma-datos',function(req,res){
	res.render('confirma_datos');
});

var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
})