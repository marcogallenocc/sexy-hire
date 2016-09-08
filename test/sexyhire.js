var chai = require('chai');
var chaiHttp = require('chai-http');
//var request = require('request');

chai.use(chaiHttp);

var url = "http://localhost";

/**
var chai = require('chai')
, chaiHttp = require('chai-http');

chai.use(chaiHttp);

var url = "http://localhost/api";

describe('GET OF index', function () {
it('passes as it is 200', function(done) {
chai.request(url)
.get('/user/verification/57d0d06afd63d006aacfa040/?vt=m0DiV5pATTlqXh57kmJI')
.end(function(err, res) {
chai.expect(res).to.have.status(404);
done(err);
});
});
});

**/

describe ("Solicita rutas con estatus 200", function(){
	describe("Ir a /", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /selector", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/selector")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /crear-book", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/crear-book")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /acerca-de -ti", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/acerca-de-ti")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /confirmar-datos ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/confirmar-datos")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /login ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/login")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /logout ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/logout")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /perfil/*** ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/perfil/123")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /modelos ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/modelos")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});

	describe("Ir a /fotografos ", function(){
		
		it("returns status 200", function(done){
			chai.request(url)
			.get("/fotografos")
			.end(function(err,response){
				chai.expect(response).to.have.status(200);
				done(err);
			});
		});
	});
});