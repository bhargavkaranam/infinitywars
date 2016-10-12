var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
router.check = function(req,res) {

	if(!req.session.tid)
	{
		var email = req.body.email;
		var password = req.body.password;
		var atpos = email.indexOf("@");
		var dotpos = email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
			console.log("Not a valid email");
			return false;
		}
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '12345678',
			database : 'infinitywars'
		});

		connection.connect();

		var sql = "SELECT tid FROM credentials where email = " + connection.escape(email) + " and password = " + connection.escape(password);
		connection.query(sql,function(err,results) {			
			if(results.length)
			{
				req.session.tid = results[0].tid;
				res.redirect('/play');

			}
			else
			{
				res.redirect('/login/render');
			}

		});

	}
	else
		res.end("Already logged in.");

};

router.render = function(req,res) {
	if(!req.session.tid)
		res.sendFile(path.join(__dirname,'../views/','login.html'));
	else
		res.redirect('/');
};

module.exports = router;