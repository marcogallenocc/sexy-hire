//Dependencias

var express = require('express');
var request = require('request');
var ig = require('instagram-node').instagram();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
var firebase = require('firebase');
var fbaseconfig = {
    apiKey: "AIzaSyBym9z15u1SyHDI8fBZzdqeNQ2j1Nv4s4g",
    authDomain: "sexy-hire.firebaseapp.com",
    databaseURL: "https://sexy-hire.firebaseio.com",
    storageBucket: "sexy-hire.appspot.com",
  };
var fbase = firebase.initializeApp(fbaseconfig);


//Sistema de templates
app.engine('handlebars', handlebars.engine);

app.set('view engine','handlebars');


/** INSTAGRAM ***/
ig.use({access_token:"TBD"});
ig.use({client_id: '19dbcc28737143d18193f0c2a312ebc1', client_secret:'302665a7671f4c67ac873bf85e1831d7'});

var redirect_uri = 'http://localhost/handleauth';

exports.authorize_user = function(req, res){
	res.redirect(ig.get_authorization_url(redirect_uri));
}

exports.handleauth = function(req,res){
	ig.authorize_user(req.query.code,redirect_uri, function(err, result){
		if(err){
			console.log(err.body);
			res.send("Fuckity fuckity foo");
		} else {
			console.log(result.access_token);
			var url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + result.access_token;

		    request(url, function(err, response, body){
		        var imgs = JSON.parse(body);
		        console.log(imgs.data[0].images.thumbnail.url);
		        var data = imgs.data;
		        var thumbnail = imgs.data[0].images.thumbnail.url;
		        res.render('insta_conectado', {datum: data});
		    });
		}
	});
};

/*** ROUTING ***/
//Ruta de archivos estaticos
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('index');
});


app.get('/login',function(req,res){
	res.render('login');
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


//INSTAGRAM AUTH USER & GET TOKEN 
app.get('/authorize_user', exports.authorize_user);
app.get('/handleauth', exports.handleauth);

app.get('/logout',function(req,res){
	fbase.auth().signOut().then(function() {
	  console.log("logout exitoso.");
	  res.send("Estas afuera  :)");
	}, function(error) {
	  // An error happened.
	});	
});


var server = app.listen(80, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
})