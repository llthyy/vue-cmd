var express = require('express');
var   router  = express.Router();
const dataurl = require('../controllers/product.control');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/data',dataurl.create);
router.put('/data/:id',dataurl.update);
router.delete('/data/:id',dataurl.remove);
router.get('/data/:id',dataurl.getData);
router.post('/list',dataurl.list);
router.post('/data/removes',dataurl.removes);
router.get('/allData',dataurl.allData);
module.exports = router;
