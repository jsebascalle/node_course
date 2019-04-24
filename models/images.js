var mongoose = require("mongoose");
var Schema = mongoose.Schema

var imagen_schema = new Schema({
  nombre: {type:String,required:"El nombre es obligatorio"},
});

var Imagen = mongoose.model("Imagen",imagen_schema);
module.exports.Imagen = Imagen;