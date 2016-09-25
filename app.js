var express = require("express");
var path = require("path");
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']); //mongojs('connectionString',['collection'])
var bodyparser = require('body-parser');

var app = express();
	
//bodyparser
app.use(bodyparser.json());

//port server
app.set('port',process.env.PORT || 9999);

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public'));

//asset
app.use('/bootstrap',express.static(__dirname+'/bower_components/bootstrap/dist/'));
app.use('/controller',express.static(__dirname+'/public/controllers/'));
app.use(express.static(path.join(__dirname+'/bower_components/')));
/*app.use(express.static(__dirname+'/public'));*/

/*console.log(__dirname);*/
app.get("/",function(req,res){
	res.render('index',{
		title : 'ExpressJS with EJS',
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

/*app.get("/contactlist",function(req,res){
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
});*/

app.get("/contactlist",function(req,res){
	db.contactlist.find(function(err,docs){
		if(err) throw err;
		console.log(docs);
		res.json(docs);
	})
});

app.post("/contactlist",function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,docs){
		res.json(docs);
	})
})

app.delete("/contactlist/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
})

app.get("/contactlist/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	})
})

app.put("/contactlist/:id",function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({ //mencari data terlebih dahulu kemudian di ubah
		query:{_id: mongojs.ObjectId(id)},
		update: {$set : {name : req.body.name, email : req.body.email, address: req.body.address}},
		new : true						
	},function(err,docs){
		res.json(docs);
	});
})

app.listen(app.get('port'),function(){
	console.log("Server is running on port "+app.get('port'));
});

//git remote add azure https://rojibfauzi@testexpress.scm.azurewebsites.net:443/testexpress.git
//git push azure master