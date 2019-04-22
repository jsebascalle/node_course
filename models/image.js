var mongoose = require("mongoose");
var Schema = mongoose.Schema

var image_schema = new Schema({
    nombre:{type:String, required:true},
    url: {type:Strig},
    creator: { type:Schema.Type.ObjectId, ref="User" }
});


var Imagen = mongoose.model("Image",image_schema);
module.exports.Imagen = Imagen;