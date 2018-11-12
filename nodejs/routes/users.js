var express = require('express');
var router = express.Router();
const dataurl = require('../controllers/user.control');
/* GET users listing. */


// 验证token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.post('/data', dataurl.create);
router.put('/data/:id', dataurl.update);
router.delete('/data/:id', dataurl.remove);
router.get('/data/:id', dataurl.getData);
router.post('/list', verifyToken, dataurl.list);
router.post('/data/removes', dataurl.removes);
router.get('/allData', dataurl.allData);
router.post('/login', dataurl.login);
module.exports = router;