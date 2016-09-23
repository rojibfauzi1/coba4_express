var express = require("express");
var path = require("path");
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']); //mongojs('connectionString',['collection'])

var app = express();

//port server
app.set('port',process.env.PORT || 9999);

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public'));

//asset
app.use('/bootstrap',express.static(__dirname+'/bower_components/bootstrap/dist/'));
app.use('/controller',express.static(__dirname+'/public/controllers/'));
app.use(express.static(path.join(__dirname+/bower_components/)));

/*console.log(__dirname);*/
app.get("/",function(req,res){
	res.render('index',{
		title : 'ExpressJS with EJS'
	});
});

//controller angular
app.get("/header",function(req,res){
	res.render('header');
});
app.get("/table",function(req,res){
	res.render('table1');
});

//server static files
/*app.use(express.static('public'));*/
/*app.use(app.router);*/
/*app.use(function(req,res){
	res.sendfile(__dirname+'/public/index.html');
console.log(__dirname+'/public/index.html');
})*/
//routes
/*app.use("/*",function(req,res){
	res.sendfile(__dirname+'/public/index.html');
});
*/
app.get("/tambahinfo",function(req,res,next){
	res.sendfile('index.html',{
		root : __dirname+'/public'
	});
});

app.get("/contactlist",function(req,res){
	console.log("I received GET a respond");

	person1 = {
		name : 'rojib',
		email : 'rojibfauzi@gmail.com',
		address : 'kotagede'
	};

	person2 = {
		name : 'fauzi',
		email : 'fauzi@gmail.com',
		address : 'condongcatur'
	};

	person3 = {
		name : 'zainn',
		email : 'zainn@gmail.com',
		address : 'bantul'
	};

	var contactlist = [person1,person2,person3];
	res.json(contactlist);
});


app.listen(app.get('port'),function(){
	console.log("Server is running on port "+app.get('port'));
});

//git remote add azure https://rojibfauzi@testexpress.scm.azurewebsites.net:443/testexpress.git
//git push azure master