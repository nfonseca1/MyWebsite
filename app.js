var express = require("express");
var app = express();

app.use(express.static(__dirname +'/public'));

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.get("/colorgame", function(req, res){
	res.render("colorgame.ejs");
});

app.get("/countries", function(req, res){
	res.render("countries.ejs");
});

app.get("/projectboost", function(req, res){
	res.render("ProjectBoost/index.ejs");
});

app.listen(3000, function(){
    console.log("server started.......");
});