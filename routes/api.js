var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:key', function(req, res, next) {
	res.send(req.params.key==="aHR0cHM6Ly90ZWNoaXNwb3dlci5jb20v")
});

module.exports = router;
