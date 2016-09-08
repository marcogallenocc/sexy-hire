var chai = require('chai');
var chaiHttp = require('chai-http');
var request = require('request');

chai.use(chaiHttp);

var url = "http://localhost:8081/";

describe ("Solicita rutas con estatus 200", function(){
	describe("Ir a /", function(){
		
		it("returns status 200", function(){
			request.get(url, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /selector", function(){
		
		it("returns status 200", function(){
			request(url + "/selector", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /crear-book", function(){
		
		it("returns status 200", function(){
			request(url + "/crear-book", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /acerca-de -ti", function(){
		
		it("returns status 200", function(){
			request(url + "/acerca-de-ti", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /confirmar-datos ", function(){
		
		it("returns status 200", function(){
			request(url + "/confirmar-datos", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /login ", function(){
		
		it("returns status 200", function(){
			request(url + "/login", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /logout ", function(){
		
		it("returns status 200", function(){
			request(url + "/logout", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /perfil/*** ", function(){
		
		it("returns status 200", function(){
			request(url + "/perfil/123", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /modelos ", function(){
		
		it("returns status 200", function(){
			request(url + "/modelos", function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe("Ir a /fotografos ", function(){
		
		it("returns status 200", function(){
			chai.request(url + "/fotografos").get("/fotografos").end(function(err,response){
				expect(response).to.have.status(200);
				done();
			});
		});
	});
});