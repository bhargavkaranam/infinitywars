var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.fetch = function(req,res) {
	if(req.session.tid)
	{
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '12345678',
			database : 'infinitywars'
		});

		connection.connect();

		var sql = "SELECT qno FROM questions";
		connection.query(sql,function(err,results) {
			res.json(results);
		});
	}
};

router.getquestion = function(req,res) {
	if(req.session.tid)
	{
		var qno = req.body.qno,flag = 0;

		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '12345678',
			database : 'infinitywars'
		});
		connection.connect();
		
		if(qno % 2 == 0) 
		{
			var sql = "SELECT qno FROM answered where tid = " + req.session.tid;

			connection.query(sql,function(err,results) {
				for(var i = 0; i < results.length;i++)
				{

					if(results[i].qno == qno - 1)
					{
						flag = 1;
						break;
					}
				}
				if(flag == 1)
				{


					sql = "SELECT * FROM questions where qno = " + connection.escape(qno);
					connection.query(sql,function(err,results) {
						connection.query("UPDATE teams SET qno = ? where tid = ?",[qno,req.session.tid],function(err1,results1) {
							if(!err1)
							{
								res.json(results);
							}

						});					
					});
				}
			});
		}
		else
		{
			var sql = "SELECT * FROM questions where qno = " + connection.escape(qno);
			connection.query(sql,function(err,results) {

				connection.query("UPDATE teams SET qno = ? where tid = ?",[qno,req.session.tid],function(err1,results1) {
					if(!err1)
					{
						res.json(results);
					}

				});			
			});	
		}		
	}
};

router.checkanswer = function(req,res) {
	if(req.session.tid)
	{
		var answer = req.body.answer;
		var flag = 0,qno;
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '12345678',
			database : 'infinitywars'
		});
		connection.connect();		

		var sql = "SELECT qno FROM teams WHERE tid = " + req.session.tid;

		connection.query(sql,function(err,results){

			qno = results[0].qno;
			
			var sql = "SELECT * FROM questions where qno = " + qno;

			connection.query(sql,function(err,results) {

				if(answer == results[0].answer)
				{
					var sql = "SELECT qno FROM answered where qno = " + qno + " and tid = " + req.session.tid;
					connection.query(sql,function(err,result){
						if(!result.length)

							connection.query("INSERT INTO answered SET ?",{tid : req.session.tid,qno : qno},function(err,result) {
								if(!err)
								{

									res.json({status : 'true'});
								}
							});
					});
				}
				else
					res.json({status : 'false'});
			});	
			
		});



	}
};

module.exports = router;