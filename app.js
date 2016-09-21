var express = require("express");
var path = require("path");

var app = express();

//port server
app.set('port',process.env.PORT || 9999);
console.log(__dirname);

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'public'));

//asset
app.use('/bootstrap',express.static(__dirname+'/bower_components/bootstrap/dist/'));
app.use(express.static(__dirname+/bower_components/));


app.get("/",function(req,res){
	res.render('index',{
		title : 'ExpressJS with EJS'
	});
});


app.listen(app.get('port'),function(){
	console.log("Server is running on port "+app.get('port'));
});