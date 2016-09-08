//Dependencias

var express = require('express');
var request = require('request');
var ig = require('instagram-node').instagram();
var handlebars = require('express-handlebars').create({defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections)this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
var bodyParser = require('body-parser');

var Api500px = require('api_500px');

var api = new Api500px ({
      key: 'TvxvhnxFeDoHLwtYVRytzLunjbJLTqljIY2MJs4F',
      secret: 'YHfIWM99itAaJaOrnXnyPYJy1AiQL5kHxcPOIIvJ',
      callback: 'http://localhost/handleAuthorize500px'
    });

var app = express();
var firebase = require('firebase');
var fbaseconfig = {
    apiKey: "AIzaSyBym9z15u1SyHDI8fBZzdqeNQ2j1Nv4s4g",
    authDomain: "sexy-hire.firebaseapp.com",
    databaseURL: "https://sexy-hire.firebaseio.com",
    storageBucket: "sexy-hire.appspot.com",
  };
var fbase = firebase.initializeApp(fbaseconfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
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
			//console.log(err.body);
			res.send("Fuckity fuckity foo");
		} else {
			console.log(result.access_token);
			var url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + result.access_token;

		    request(url, function(err, response, body){
		        var imgs = JSON.parse(body);
		        var data = imgs.data;
		        res.render('insta_conectado', {datum: data});
		    });
		}
	});
};

/*****
500PX 
*****/
exports.authorize500px = function(req,res){
	api.authRequest(function(err, authToken, authSecret, results)
	{
	  if (err){
	  	res.send(err);
	  };

	  //res.send('https://api.500px.com/v1/oauth/authorize?oauth_token='+authToken);
	  // redirect client to OAuth page
	  res.redirect('https://api.500px.com/v1/oauth/authorize?oauth_token='+authToken);
	  //callback(null, 'https://api.500px.com/v1/oauth/authorize?oauth_token='+authToken);
	});
}

exports.handleAuthorize500px = function(req,res){
	api.getAccessToken('api_500px_auth_verifier_token', function(err, accessToken, accessSecret, results)
		{
		  if (err) {
		  	//console.log(err.body);
		  	res.send(err);
		  };

		  // access token's been stored within the api instance as well
		  //callback(null, {status: 'ready'});

		  //res.render('500_conectado');
		  res.send(accessToken);
		});
}

/*** ROUTING ***/
//Ruta de archivos estaticos
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.render('index');
});


app.get('/login',function(req,res){
	res.render('login');
});

app.get('/validate',function(req,res){
	var user = req.param('h_user');
	var uid = req.param('h_uid');	
	var ref = new firebase("https://sexy-hire.firebaseio.com");
	var db = ref.database();	
	
	var usuario = db.child("users");
	
	 //En firebase
	usuario(uid).once('value', function(snapshot) {
		console.log(snapshot.val());
	});
	//console.log(usuario);
	//res.send(usuario);
	//fbase.auth().onAuthStateChanged(function(user) {
	//	if (user) {
	//	uid = user.Id;
	//	console.log("user: " + uid);
	//	window.location.href= "/crear_book"
	//	} else {
	//	console.log("user: " + uid);
	//	console.log('No estas logueado');
	//	window.location.href= "/"
	//	}
	//});		
	res.send("validado hijo de la morning");
});

app.get('/selector',function(req,res){
	res.render('selector');
});

app.post('/selector',function(req,res){

	res.send(req.body);
	
});

app.get('/crear-book',function(req,res){
	res.render('crear_book');
});

app.get('/acerca-de-ti',function(req,res){
	res.render('acerca_de_ti');
});

app.post('/acerca-de-ti',function(req,res){

	/***
	TODO: Agregar a la base de datos req.body.presentacion 
	***/
	//res.send(req.body.presentacion);
	res.redirect('/confirma-datos');
	//res.render('acerca_de_ti');
});

app.get('/confirma-datos',function(req,res){
	res.render('confirma_datos');
});


//INSTAGRAM AUTH USER & GET TOKEN 
app.get('/authorize_user', exports.authorize_user);

app.get('/handleauth', exports.handleauth);

/// 500PX URLS
app.get('/authorize-500px', exports.authorize500px);

app.get('/handleAuthorize500px', exports.handleAuthorize500px);


app.get('/logout',function(req,res){
	fbase.auth().signOut().then(function() {
	  console.log("logout exitoso.");

	  /*********
		IMPLEMENTAR REDIRECT A HOME!
	  ****////////
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