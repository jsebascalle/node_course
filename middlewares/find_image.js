var Imagen = require('./models/image.js').Imagen;
var owner_check =  require('./middlewares/image_permission.js');

module.exports = function(req, res,next){
  Imagen.findById(req.params.id, function (err, imagen) {
    if (imagen != null && owner_check(imagen,req,res) ) {
    	res.locals.imagen = imagen;
    	next();
    }else{
    	//algo
    }
  });
}