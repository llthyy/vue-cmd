const mongoose=require('mongoose');
const User = require('../models/cart.model');
//新增
exports.create = function(req,res,next){
    const user = User(req.body);
    user.save().then((data)=>{
      res.json(data);
    });
}
//修改
exports.update = function(req,res,next){
   const id = req.params.id;  //找到id
   //从数据模型中查找并修改，没找到自动创建
   User.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
       res.json(data);//返回的是修改之前的数据
   })
}
//删除
exports.remove = function(req,res,next){
    const id = req.params.id;
    User.findByIdAndDelete(id,(err,data)=>{
        res.json(data);
    })
 }
 //查询单个数据根据单个id
 exports.getData=function(req,res,next){
     var id = req.params.id;  //先找到对应的id
     User.findById(id).then(data=>{
         res.json(data);
     })
 }
//随便想的
exports.lists=function(req,res,next){
    // console.log(req.body);
    //实现分页
    var page           = req.body.page?req.body.page:1;
    var rows           = req.body.rows?req.body.rows:5;
    var queryCondition = {};                             //查询条件的对象
    if(req.body.userID && req.body.userID.trim().length>0){
        //根据查询条件搜索记录
        userID      = req.body.userID;
                            var str            = '(.*)'+userID+'(.*)';
                                queryCondition = {
            "userID": new RegExp(str,'g')
        }
    }else{
        //显示全部数据
        userID      = req.body.userID;
        queryCondition = {
            "userID": new RegExp(userID,"i")
        }
    }
    
    //引入之后进行调用分页插件
    User.paginate(queryCondition,{page:+page,limit:+rows},function(err,result){
        console.log(result);
        result.rows = result.docs;  //解决docs和框架的rows不统一的问题
        delete result.docs;//docs和rows都存在删除docs
        res.json(result);
    });
}

 //查询多个数据
 exports.list=function(req,res,next){
     //实现分页
    var page           = req.body.page?req.body.page:1;
    var rows           = req.body.rows?req.body.rows:5;
    var queryCondition = {};                             //查询条件的对象
    if(req.body.goodsName && req.body.goodsName.trim().length>0){
        //根据查询条件搜索记录
                                goodsName      = req.body.goodsName;
                            var str            = '(.*)'+goodsName+'(.*)';
                                queryCondition = {
            "goodsName": new RegExp(str,'g')
        }
    }else{
        //显示全部数据
        goodsName      = req.body.goodsName;
        queryCondition = {
            "goodsName": new RegExp(goodsName,"i")
        }
    }

    //引入之后进行调用分页插件
    User.paginate(queryCondition,{page:+page,limit:+rows},function(err,result){
        result.rows = result.docs;  //解决docs和框架的rows不统一的问题
        delete result.docs;//docs和rows都存在删除docs
        res.json(result);
    });
 }
 //批量删除的url
 exports.removes=function(req,res,next){
     var ids = req.body.ids.split(',');
     if (ids.length>0) {
         User.remove({_id:{$in:ids}}).then(data=>{
             res.json({'message':'delete ok',status:200});
         })
     }
 }
//查询所有记录,用于搜索
exports.allData=function(req,res,next){
    User.find().then(data=>{
        res.json(data);
    })
}