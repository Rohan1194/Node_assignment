var express = require('express');
var dd=require("../models/data")
var app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookstore');
 //var db=mongoose.connection;
var bodyParser=require('body-parser');
//var Data=require('../models/data');
var router=express.Router();
router.get('/show',function(req,res){
  dd.find({})
  .exec(function(err,books)
  {
  	res.json(books);
  });
}); 

router.post('/add',function(req,res){
dd.create(req.body).then(function(data){
	res.send(data);
});
}); 


router.delete('/remove',function(req,res){
	console.log(req.body._id);
   dd.remove({ _id: req.body._id }, function(err) {
    if (!err) {
            res.send("sucess");
    }
    else {
            res.send("error");
    }
});
});

router.put('/edit/:id',function(req,res){
dd.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
 dd.findOne({_id:req.params.id}).then(function(data){
    res.send(data);

 })
})
  })
 
module.exports= router;