var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require('./models/user.js').User;
var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/appnode',{useNewUrlParser: true});

app.set('view engine', 'pug'); // register the template engine

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello sebas!'});
});


app.get('/login', function (req, res) {
  User.find({}, function (err, docs) {
  	 //res.writeHead(200, {"Content-Type": "application/json"});
	 res.render('login',{"docs":docs});
  });
});


app.post('/login', function (req, res) {
   var user = new User({email:req.body.email,password:req.body.password,password_confirmation:req.body.password_confirmation});
   user.save(function(err){
   	 if (err) {
   	 	console.log(String(err));
   	 }

   	 res.send("Se creo el usuario!");
   });

});

app.listen(3000);