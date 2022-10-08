var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:key', function(req, res, next) {
	console.log(req.params.key);
	res.render("wifi")
});

router.post('/:key', function(req, res, next) {
	console.log("wifi");
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
});

module.exports = router;
