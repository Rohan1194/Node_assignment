var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    genre: String,
    description: String,
    author: String,
    publisher: String
},
{
	versionKey: false
});

var data = mongoose.model('book', BookSchema)
module.exports= data;