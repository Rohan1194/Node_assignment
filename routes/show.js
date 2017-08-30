var express = require('express');
var dd=require("../models/data")
var app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookstore');
 //var db=mongoose.connection;
var bodyParser=require('body-parser');
//var Data=require('../models/data');
var router=express.Router();

router.get('/',function(req,res){
  dd.find(function(err,books)
  {
  	res.json(books);
  });
});

/*router.post('/show',function(req,res){
  dd.find(function(err,books)
  {
    res.json(books);
  });
});*/

router.post('/add', (req, res) => {
    var databook = new dd();
    databook.title = req.body.title
    databook.author = req.body.author
   databook.save((err, book) => {
        if (err) {
            res.send('fail to add');
        } else {
            res.json(book)
        }
    })
 })

router.delete('/delete/:id', (req, res) => {
    dd.remove({
        _id: req.params.id
    }, (err, book) => {
        if (err) res.send('error deleting')
        else {
            res.json(book)
        }
    })
})

router.put('/update/:id', (req, res) => {
    dd.update({
        _id: req.params.id

    }, { $set: { title: req.body.title } },  (err, newBook) => {
        if (err)
            res.send("error in updating")
        else {
            res.send(newBook)
        }
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

/*router.get('/', (req, res) => {
    dd.find((err, book) => {
        res.send(book);
        });
});*/
 
module.exports= router;
