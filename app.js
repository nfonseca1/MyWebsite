var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public/"));


app.get("/", function(req, res){
	res.sendFile("index.html", {root: `${__dirname}/public/`});
});

app.get("/projects", function(req, res) {
	res.sendFile("projects.html", {root: `${__dirname}/public/`});
});

app.get("/colorgame", function(req, res){
	res.sendFile("ColorGame/colorgame.html", {root: `${__dirname}/public/`});
});

app.get("/countries", function(req, res){
	res.sendFile("Countries/countries.html", {root: `${__dirname}/public/`});
});

app.get("/projectboost", function(req, res){
	res.sendFile("ProjectBoost/index.html", {root: `${__dirname}/public/`});
});

app.get("/projectboostmobile", function(req, res){
	res.sendFile("ProjectBoost/mobile.html", {root: `${__dirname}/public/`});
});

app.get("/notes/git", function(req, res){
	res.sendFile("Notes/git.html", {root: `${__dirname}/public/`});
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server started...");
});