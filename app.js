var express = require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var router=require('./routes/show');
/*to apply different http requests across the body*/

var mongoose=require('mongoose');

/*Connect to mongodb database*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

// /*To connect to mongoDb*/
//var db= mongoose.connect('mongodb://localhost:27017/bookstore');
// var db=mongoose.connection;

app.use('/show',router);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports=app;