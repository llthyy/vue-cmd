var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const DB_CONN_STR = 'mongodb://localhost:27017';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


// 获取帮助
router.post('/help', function(req, res, next) {
    MongoClient.connect(DB_CONN_STR, (err, client) => {
        if (err) console.log(err)
        var db = client.db('vue');
        var conn = db.collection('help');
        var result = conn.find().toArray()
        result.then(function(data) {
            if (data.length > 0) {
                res.send({
                    result: data
                })
            } else {
                res.send({
                    result: null
                })
            }
        }).catch(function(err) {
            console.log(err)
        })
    })
})

//存入帮助
router.post('/inserthelp', function(req, res, next) {
    MongoClient.connect(DB_CONN_STR, (err, client) => {
        if (err) console.log(err)
        var db = client.db('vue');
        var conn = db.collection('help');
        var result = conn.insert({ question: req.body.questionTitle, answers: req.body.answersContent })
        result.then(function(data) {
            if (data.result.ok) {
                res.send({
                    msg: '发布成功'
                })
            } else {
                res.send({
                    msg: '发布失败'
                })
            }
        }).catch(function(err) {
            console.log(err)
        })
    })
})

module.exports = router;