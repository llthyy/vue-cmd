const mongoose = require('mongoose');
const User = require('../models/help.model');
//新增
exports.create = function(req, res, next) {
        const user = User(req.body);
        user.save().then((data) => {
            res.json(data);
        });
    }
    //修改
exports.update = function(req, res, next) {
        const id = req.params.id; //找到id
        //从数据模型中查找并修改，没找到自动创建
        User.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
            res.json(data); //返回的是修改之前的数据
        })
    }
    //删除
exports.remove = function(req, res, next) {
        const id = req.params.id;
        User.findByIdAndDelete(id, (err, data) => {
            res.json(data);
        })
    }
    //查询单个数据根据单个id
exports.getData = function(req, res, next) {
        var id = req.params.id; //先找到对应的id
        User.findById(id).then(data => {
            res.json(data);
        })
    }
    //查询多个数据
exports.list = function(req, res, next) {
        //实现分页
        var page = req.body.page ? req.body.page : 1;
        var rows = req.body.rows ? req.body.rows : 10;
        var queryCondition = {}; //查询条件的对象
        if (req.body.question && req.body.question.trim().length > 0) {
            question = req.body.question;
            queryCondition = {
                'question': new RegExp(question, 'i') //使用正则
            }
        }
        //引入之后进行调用分页插件
        User.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
            result.rows = result.docs; //解决docs和框架的rows不统一的问题
            delete result.docs; //docs和rows都存在删除docs
            res.json(result);
        });
    }
    //批量删除的url
exports.removes = function(req, res, next) {
        var ids = req.body.ids.split(',');
        if (ids.length > 0) {
            User.remove({ _id: { $in: ids } }).then(data => {
                res.json({ 'message': 'delete ok', status: 200 });
            })
        }
    }
    //查询所有记录,用于搜索
exports.allData = function(req, res, next) {
    User.find().then(data => {
        res.json(data);
    })
}