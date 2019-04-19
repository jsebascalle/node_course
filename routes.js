var express = require('express');

var router = express.Router();


router.get('/', function (req, res) {
  console.log(req.session.user_id)
  res.render('app/home', { title: 'Hey', message: 'Hello sebas!'});
});




module.exports = router;