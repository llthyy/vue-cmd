var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/cate.controller');
/* GET users listing. */

router.post('/data', dataCtrl.create);
router.get('/data/:id', dataCtrl.getData);
router.put('/data/:id', dataCtrl.update);
router.post('/list/:type', dataCtrl.list);
router.delete('/data/:id', dataCtrl.remove);
router.delete('/rem/:id', dataCtrl.removechild);
module.exports = router;