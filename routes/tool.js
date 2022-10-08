var express = require('express');
var router = express.Router();
const createWorker = require('tesseract.js').createWorker;

const worker = createWorker({
  logger: m => console.log(m)
});

router.get('/:toolname', function(req, res, next) {
    if(req.params.toolname){
        res.render(req.params.toolname)
    }else{
        res.send("ĐÉO CÓ TRANG NÀY NHÉ")
    }
});


router.post('/:toolname', async function(req, res, next) {
    switch(req.params.toolname){
        case "readimage":
            await worker.load();
            await worker.loadLanguage('vie');
            await worker.initialize('vie');
            const { data: { text } } = await worker.recognize(req.body.image);
            try{
                var data = {
                    code : text.match(/Mã Thẻ [0-9]+/g)[0]||'Không lấy được',
                    serial : text.match(/Số Sê-ri [0-9]+/g)[0]||'Không lấy được',
                    network : text.match(/vetet +.+/g)[0]||'Không lấy được',
                    expired : text.match(/Ngày Hết Hạn +.+/g)[0]||'Không lấy được',
                }
            }catch(e){
                console.log(e);
            }finally{
                if(data){
                    data.status = 200
                    res.send(data)
                }else{
                    var data = {
                        status : 404,
                        text : text
                    }
                    res.send(data)
                }
            }
            break;
        default :
            res.send("CON CẶC")
            break;
    }
});

module.exports = router;