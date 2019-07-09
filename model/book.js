const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	_id= mongoose.Schema.Types.objectId,
	title:{
		type:String,
		required:true,
		unique:true

	},
	author:String,
	isbn:String,
	price:{
		type:Number,
		required:true,
	}
})

module.exports = mongoose.model('Book',bookSchema);