//Dependencias

var express = require('express');
var request = require('request');
var ig = require('instagram-node').instagram();

var bodyParser = require('body-parser')
var credentials = require('./credentials.js');


var handlebars = require('express-handlebars').create({defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections)this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
;

//var Api500px = require('api_500px');

//var api = new Api500px ({
//     key: 'TvxvhnxFeDoHLwtYVRytzLunjbJLTqljIY2MJs4F',
//      secret: 'YHfIWM99itAaJaOrnXnyPYJy1AiQL5kHxcPOIIvJ',
//      callback: 'http://localhost/handleAuthorize500px'
//    });

var app = express();
var firebase = require('firebase');
var fbaseconfig = {
    apiKey: "AIzaSyBym9z15u1SyHDI8fBZzdqeNQ2j1Nv4s4g",
    authDomain: "sexy-hire.firebaseapp.com",
    databaseURL: "https://sexy-hire.firebaseio.com",
    storageBucket: "sexy-hire.appspot.com",
  };
firebase.initializeApp(fbaseconfig);


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
			var inst_access_token =res.cookie('int_at', result.access_token, {signed: true});
			res.redirect('/crear-book');
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

//USER ABSTRACT

function getUserParams(req,res){
	var user = {
		id:124,
		name: req.cookies.user
	};

	return user;
}


app.use(function(req,res,next){
	console.log('processing request for"' + req.url + '"...');
	next();
});
/*** ROUTING ***/
//Ruta de archivos estaticos
//app.use(express.static("/public", __dirname + 'public'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extend: true}));

app.use(require('cookie-parser')(credentials.cookieSecret));

app.get('/',function(req,res){
	res.render('index');
});


app.get('/login',function(req,res){
	res.render('login');
});

app.get('/validate',function(req,res){
	var user = req.param('h_user');
	var uid = req.param('h_uid');	
	var db = firebase.database();		
	var usuario = db.ref().child("users");
	
	 //En firebase
	usuario.child(uid).once('value', function(snapshot) {	
		if(snapshot.val()){
			res.cookie('user',user);
			return res.redirect('/portafolio/'+ uid);
		}
		else{
			var objUser = {UserId: uid, Nombre: user};			
			usuario.child(uid).set(objUser);
			res.cookie('user',user);
			return res.redirect('/selector');
		}				
	});	
});

app.get('/selector',function(req,res){
	

	
	res.render('selector',{usuario: getUserParams(req,res)});
});

app.post('/selector',function(req,res){

	//res.send(req.body);
	res.redirect('crear-book');
	
});

app.get('/crear-book',function(req,res){

	var ins_atoken = req.signedCookies.int_at;


	if(ins_atoken) {
		var url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + ins_atoken;

		    request(url, function(err, response, body){
		        var imgs = JSON.parse(body);
		        var data = imgs.data;
		        res.render('crear_book', {datum: data, usuario: getUserParams(req,res)});
		    });
	}else {
		res.render('crear_book');	
	}
	
});

app.post('/crear-book', function(req, res){

		/***
		var imgArr = req.body.selector_imgs;

		res.send(imgArr);
		***/
		res.redirect("/acerca-de-ti");	
});

app.get('/acerca-de-ti',function(req,res){
	res.render('acerca_de_ti', {usuario: getUserParams(req,res)});
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
	res.render('confirma_datos', {usuario: getUserParams(req,res)});
});

app.post('/confirma-datos',function(req,res){
	res.redirect('/portafolio/*');
});

app.get('/portafolio/:uid', function(req, res){
	var uid = req.params.uid;
	
	res.render('portafolio', {layout:'portf'});
});

//INSTAGRAM AUTH USER & GET TOKEN 
app.get('/authorize_user', exports.authorize_user);

app.get('/handleauth', exports.handleauth);

/// 500PX URLS
//app.get('/authorize-500px', exports.authorize500px);

//app.get('/handleAuthorize500px', exports.handleAuthorize500px);

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