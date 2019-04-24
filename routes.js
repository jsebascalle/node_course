var express = require('express');
var Imagen = require('./models/images.js').Imagen;
var router = express.Router();


router.get('/', function (req, res) {
  console.log(req.session.user_id)
  res.render('app/home', { title: 'Hey', message: 'Hello sebas!'});
});

router.get("app/imagenes/new",function(req,res){
	res.render('app/imagenes/new');
});


router.get("app/imagenes/:id/edit",function(req,res){
	res.render('app/imagenes/new');
});

/*REST*/
router.route("/imagenes/:id")
	.get(function(req,res){
		Imagen.findById(req.params.id,function(err,imagen){
			res.render('app/imagenes/show',{imagen:imagen});
		});
		
	})
	.put(function(req,res){
		
	})
	.delete(function(req,res){
		
	});

router.route("/imagenes")
	.get(function(req,res){
		Imagen.find({},function(err,docs){
			res.render('app/imagenes/index',{docs:docs});
		});
	})
	.post(function(req,res){
		var data = {
			nombre : req.body.nombre
		};

		var imagen = Imagen(data);

		imagen.save(function(err){
			if (!err) {
				res.redirect("app/imagenes/"+imagen._id);
			}else{
		      res.send("No se pudo crear la imagen!");
		    }
		});
	});


module.exports = router;