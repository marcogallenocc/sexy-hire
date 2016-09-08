var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var firebase = require('firebase');
var fbaseconfig = {
    apiKey: "AIzaSyBym9z15u1SyHDI8fBZzdqeNQ2j1Nv4s4g",
    authDomain: "sexy-hire.firebaseapp.com",
    databaseURL: "https://sexy-hire.firebaseio.com",
    storageBucket: "sexy-hire.appspot.com",
  };
var fbase = firebase.initializeApp(fbaseconfig);

app.engine('handlebars', handlebars.engine);

app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));

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