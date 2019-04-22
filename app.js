var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var router = require("./routes");
var User = require('./models/user.js').User;
var methodOverride = require('method-override');

var app = express();
var session_middelware = require("./middlewares/session");

mongoose.connect('mongodb://localhost/appnode',{useNewUrlParser: true});

app.set('view engine', 'pug'); // register the template engine
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: "134252673889dgdhdjdjg",
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/', function (req, res) {
  if (req.session.user_id) 
    res.redirect("/app");

  res.render('index', { title: 'Hey', message: 'Hello sebas!'});
});


app.get('/register', function (req, res) {
  User.find({}, function (err, docs) {
    console.log(docs);
   res.render('register',{"docs":docs});
  });
});

app.post('/register', function (req, res) {
   var user = new User({email:req.body.email,password:req.body.password,password_confirmation:req.body.password_confirmation});
   user.save(function(err){
     if (err) {
      console.log(String(err));
      res.send("No se pudo crear el usuario!");
     }

     res.send("Se creo el usuario!");
   });

});


app.get('/edit/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
   res.render('edit',{"user":user});
  });
});

app.put('/edit/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    
    user.email = req.body.email;
    user.save({ validateBeforeSave: false },function(err){
      if (!err) {
          res.send("Se actualizo el usuario!");
      }else{
          console.log(err);
          res.redirect("/edit/"+req.params.id);
      }
    });
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/signup', function (req, res) {
  User.findOne({email:req.body.email,password:req.body.password}, function (err, user) {

    if (err){
      res.send("No se pudo iniciar sesion!");
    }
    else if(user){
      req.session.user_id = user._id;
      res.redirect("/app");
    }else{
      res.send("No se pudo iniciar sesion!");
    }
    
  });
});


app.delete('/delete/:id', function (req, res) {
  User.findOneAndDelete({_id:req.params.id}, function (err) {
      if (!err) {
        res.redirect("/register");
      }else{
        console.log(err);
      }
  });
});


app.use("/app",session_middelware);
app.use("/app",router);


app.listen(3000);