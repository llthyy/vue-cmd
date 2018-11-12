var mongoose = require('mongoose');
const News = require('../models/news.model');

// 新增
exports.create = function(req, res, next) {
    const news = new News(req.body);
    news.save().then((data) => {
        res.json(data);
    });
}

exports.update = function(req, res, next) {
        const id = req.params.id;
        News.findByIdAndUpdate(id, { $set: req.body }, { new: false })
            .then(data => {
                res.json(data); // 这里返回的数据是修改之前的数据，不是修改之后的数据
            })
    }
    //删除单个
exports.remove = function(req, res, next) {
        const id = req.params.id;
        News.findByIdAndDelete(id, (err, data) => {
            res.json(data);
        })
    }
    //获取数据  加上了分页
exports.list = function(req, res, next) {
        var page = req.body.page ? req.body.page : 1;
        var rows = req.body.rows ? req.body.rows : 10;
        // var cateId = req.body.cateId ? req.body.cateId : null;

        var queryCondition = {}; //查询条件

        if (req.body.child == undefined) {
            if (req.body.name && req.body.name.trim().length > 0) {
                name = req.body.name;
                queryCondition = {
                    "name": new RegExp(name, 'i')
                }
            }
            if (req.body.cateName) {
                var cateName = req.body.cateName;
                //Object.assign  差U型你条件合并
                queryCondition = Object.assign(queryCondition, {
                    cateName: cateName
                })
            }

            if (req.body.userId && req.body.userId.trim().length > 0) {
                var userId = req.body.userId;
                queryCondition = Object.assign(queryCondition, {
                    userId: userId
                })
            }
        } else {
            queryCondition = {}
        }
        News.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
            result.rows = result.docs;
            delete result.docs;
            res.json(result);
            // console.log(result);

        });

    }
    //根据id获取单个数据
exports.getData = function(req, res, next) {
        var id = req.params.id;
        News.findById(id).then(data => {
            res.json(data);
        })
    }
    //删除多个
exports.removes = function(req, res, next) {
    var ids = req.body.ids.split(',');
    if (ids.length > 0) {
        News.remove({ _id: { $in: ids } }).then(data => {
            res.json({
                'message': 'delete ok'
            })
        })
    }
}
exports.getComment = function(req, res, next) {
    Pings.find().then(data => {
        res.json(data);
    })
}