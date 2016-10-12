var express = require('express');
var router = express.Router();
var path = require('path');

router.execute = function(req,res) {
	if(req.session.tid)
	{
		res.sendFile(path.join(__dirname,'../views/','play.html'));
	}
	else
		res.redirect('/login/render');
};

module.exports = router;