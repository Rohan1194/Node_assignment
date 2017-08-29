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

/*Multiplication*/
router.post('/multiply/:id1/:id2',(req,res)=>{
  var a=req.params.id1;
  console.log(a);
  var b=req.params.id2;
  var c=a * b;
  console.log(c)
  res.send(c.toString());
})

/*Addition*/
router.post('/add/:id1/:id2',function(req,res){
  var a=req.params.id1;
  var b=req.params.id2;
  var c= a + b;
  res.send(c.toString());
})
 
module.exports= router;
