const mongoose=require('mongoose');
const Order = require('../models/order.model');
//新增
exports.create = function(req,res,next){
    const order = Order(req.body);
    order.save().then((data)=>{
      res.json(data);
    });
}
//修改
exports.update = function(req,res,next){
   const id = req.params.id;  //找到id
   //从数据模型中查找并修改，没找到自动创建
   Order.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
       res.json(data);//返回的是修改之前的数据
   })
}
//删除
exports.remove = function(req,res,next){
    const id = req.params.id;
    Order.findByIdAndDelete(id,(err,data)=>{
        res.json(data);
    })
 }
 //查询单个数据根据单个id
 exports.getData=function(req,res,next){
     var id = req.params.id;  //先找到对应的id
     Order.findById(id).then(data=>{
         res.json(data);
     })
 }
 //查询多个数据
 exports.list=function(req,res,next){
     //实现分页
    var page           = req.body.page?req.body.page:1;
    var rows           = req.body.rows?req.body.rows:5;
    var queryCondition = {};                             //查询条件的对象
    // if(req.body.name&&req.body.name.trim().length>0){
    //     name           = req.body.name;
    //     queryCondition = {
    //         'name': new RegExp(name,'i')  //使用正则
    //     }
    // }

    if(req.body.userName && req.body.userName.trim().length>0){
        //根据查询条件搜索记录
                            userName       = req.body.userName;
                        var str            = '(.*)'+userName+'(.*)';
                            queryCondition = {
            "userName": new RegExp(str,'i')
        }
    }else if(req.body.orderState){
                        orderState     = req.body.orderState;
                    var str            = orderState;
                        queryCondition = Object.assign(queryCondition,{
            orderState: orderState
        });
    }else{
        //显示全部数据
        userName       = req.body.userName;
        queryCondition = {
            "userName": new RegExp(userName,'i')
        }
    }

    //引入之后进行调用分页插件
    Order.paginate(queryCondition,{page:+page,limit:+rows},function(err,result){
        result.rows = result.docs;  //解决docs和框架的rows不统一的问题
        delete result.docs;//docs和rows都存在删除docs
        res.json(result);
    });
 }
 //批量删除的url
 exports.removes=function(req,res,next){
     var ids = req.body.ids.split(',');
     if (ids.length>0) {
         Order.remove({_id:{$in:ids}}).then(data=>{
             res.json({'message':'delete ok',status:200});
         })
     }
 }
//查询所有记录,用于搜索
exports.allData=function(req,res,next){
    Order.find().then(data=>{
        res.json(data);
    })
}