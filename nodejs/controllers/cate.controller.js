const mongoose = require('mongoose');
const Cate = require('../models/cate.model');

//新增
exports.create = function(req, res, next) {
    const cate = new Cate(req.body);
    cate.save().then((data) => {
        res.json(data);
    });
};
//更新
exports.update = function(req, res, next) {
    var id = req.params.id;
    Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false })
        .then(data => {
            res.json(data); //这里是修改前的数据，不是修改后的数据
        })
};
//删除
exports.remove = function(req, res, next) {
        const id = req.params.id;
        Cate.findByIdAndDelete(id, (err, data) => {
            res.json(data);
        })
    }
    // 移除所有子项
exports.removechild = function(req, res, next) {
        const id = req.params.id
        console.log(id)
            // Cate.remove({ parentId: id }).then((err, data) => {
            //     console.log(data)
            //     res.json(data);
            // })
        Cate.findOne({ _id: id }, function(err, doc) {
            // access to the children
            var ids = [];
            console.log(doc)
            ids.push(doc._id)
                // console.log(doc._id)
                // console.log(ids)
            doc.getChildren(function(err, docs) {
                console.log(docs)
                for (var i = 0; i < docs.length; i++) {
                    ids.push(docs[i]._id)
                        // console.log(docs[i]._id)
                }
                for (var j = 0; j < ids.length; j++) {
                    // console.log(ids[j])
                    Cate.remove({ _id: ids[j] }).then(response => {
                        console.log(response)
                        res.send(response)
                    })
                }
                // console.log(ids)
            })

        })
    }
    //查询
function reverseTree(data, pid) {
    var result = [],
        temp;
    var data = JSON.parse(JSON.stringify(data)); //将数据模型的对象转成字符串，再将字符串转成Js.object
    //用json是因为模型内是没有children这个属性节点的，但后期又要加入children属性，所以这种转换后期就可以随意加
    for (var i in data) {
        if (data[i].parentId == pid) {
            result.push(data[i]);
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }

    }
    return result;
}

exports.list = function(req, res, next) {
    var type = req.params.type || 1;
    Cate.find({ type: type }).then(data => {
        // console.log(data); //返回一个数组  说明可以进行递归操作

        var rpTree = reverseTree(data, null);
        res.json(rpTree);
        // console.log(rpTree[0].children[0]);

    })

};
//通过id
exports.getData = function(req, res, next) {
    var id = req.params.id;
    Cate.findById(id).then(data => {
        res.json(data);
    })
}