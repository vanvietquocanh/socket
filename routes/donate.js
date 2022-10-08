var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var info = {
		name : "Techispower",
		dns  : "techispower.com"
	}
  	res.render('donate', { info: info});
});

module.exports = router;
