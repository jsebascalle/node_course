var mongoose = require("mongoose");
var Schema = mongoose.Schema

var user_schema = new Schema({
  email: {type:String,required:"El correo es obligatorio"},
  password: {type:String,required:"La contraseña es obligatorio",minlength:[8,"La contraseña es muy corta"]}
});

user_schema.virtual("password_confirmation").get(function(){
 return this.pws;
}).set(function(password){
	this.pws = password;
});


var User = mongoose.model("User",user_schema);
module.exports.User = User;