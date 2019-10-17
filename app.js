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

app.get("/tanksdemo", function(req, res){
	res.render("TanksDemo/index.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
});