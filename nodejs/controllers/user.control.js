const mongoose = require('mongoose');
const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
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
        var rows = req.body.rows ? req.body.rows : 5;
        var queryCondition = {}; //查询条件的对象
        if (req.body.username && req.body.username.trim().length > 0) {
            //根据查询条件搜索记录
            username = req.body.username;
            var str = '(.*)' + username + '(.*)';
            queryCondition = {
                "username": new RegExp(str, 'i')
            }
        } else if (req.body.education && req.body.education.length > 0) {

            education = req.body.education;
            var str = '(.*)' + education + '(.*)';
            queryCondition = Object.assign(queryCondition, {
                education: education
            })
        } else {
            //显示全部数据
            username = req.body.username;
            queryCondition = {
                "username": new RegExp(username, "i")
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
exports.login = function(req, res, next) {
    // const user = {
    //     id: 1,
    //     username: 'root',
    //     email: 'root@qq.com'
    // }
    var username = req.body.username,
        password = req.body.password;
    User.find({ username: username, password: password }).then(response => {
            console.log(response)
            if (response.length > 0) {
                var result = response[0]
                jwt.sign({ result }, 'secret', (err, token) => {
                    res.json({ token });
                })
            } else {
                res.json({ msg: '用户名或密码错误' })
            }
        })
        // secret: 公钥密钥
        // jwt.sign({ user }, 'secret', (err, token) => {
        //     res.json({ token });
        // })
};

// function verifyToken(req, res, next) {
//     const bear
// }