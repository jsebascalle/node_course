var User = require('../models/user.js').User;

module.exports = function(req,res,next){
	console.log(req.session);
	if (!req.session.user_id) {
		res.redirect("/login");
	}else{
		User.findById(req.session.user_id,function(err,user){
			if (err) {
				console.log(err);	
				res.redirect("/login");
			}else{

				res.locals = { user_auth : user };
				next();
			}
		});
	}
};

/*module.exports = function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
};*/