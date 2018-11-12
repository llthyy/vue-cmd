var express = require('express');
var router = express.Router();

//引入控制层模块
const dataurl = require('../controllers/ping.controller');
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/data', dataurl.create);
// router.put('/data/:id', dataurl.update);
router.delete('/data/:id', dataurl.remove);
router.get('/data/:id', dataurl.getData);
router.post('/list', dataurl.list);
router.post('/data/removes', dataurl.removes);
router.get('/allData', dataurl.allData);
router.post('/objRemoves', dataurl.objRemoves);
module.exports = router;