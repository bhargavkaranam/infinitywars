var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.tid)
  	res.redirect('play/');
  else
  	res.redirect('login/render');
});

module.exports = router;
