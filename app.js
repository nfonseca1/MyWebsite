var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.engine("html", require("ejs").__express);

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

app.get("/projectboostmobile", function(req, res){
	res.render("ProjectBoostMobile/index.ejs");
});

app.get("/notes/git", function(req, res){
	res.render("Notes/Git/index.ejs");
});

app.get("/oura", function(req, res){
	res.redirect("https://cloud.ouraring.com/oauth/authorize?response_type=token&client_id=ARW3E2S44QW5TIZL");
})

app.get("/oura/log", function(req, res){
	console.log(req);
	res.render("Oura/index.ejs", {data: req});
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("server started.......");
});