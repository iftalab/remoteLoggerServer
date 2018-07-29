const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    updated : {type : Date, default : Date.now},
	appId : String,
	userId : String,
	tag : String,
	data : String,
});
module.exports = mongoose.model('Log',logSchema);
