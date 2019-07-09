const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	email:{
		type:String,
		required:true,
		unique:true,
	},
	password:{
		type:String,
		required:true
	},
	name:String,
	user_type:String,
})

module.exports = mongoose.model('User',userSchema);