var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/", (req, res, next)=>{
    res.send(req.body)
})
module.exports = router;
