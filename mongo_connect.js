var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Schema = mongoose.Schema;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/appnode',{useNewUrlParser: true});


var userSchemaJson = new Schema({
  email: String,
  password: String
});

var User = mongoose.model("User",userSchemaJson);

app.set('view engine', 'pug'); // register the template engine

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello sebas!'});
});


app.get('/login', function (req, res) {
  res.render('login');
});


app.post('/login', function (req, res) {
   var user = new User({email:req.body.email,password:req.body.password});
   user.save(function(){
   	 res.send("Se creo el usuario!");
   });

});

app.listen(3000);