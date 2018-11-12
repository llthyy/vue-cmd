var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/news.controller')

// rest api get/post/put/delete

router.post('/data', dataCtrl.create);
router.get('/data/:id', dataCtrl.getData);
router.put('/data/:id', dataCtrl.update);
router.delete('/data/:id', dataCtrl.remove);
router.post('/list', dataCtrl.list);
router.post('/data/removes', dataCtrl.removes);
router.post('/comments', dataCtrl.getComment);


module.exports = router;