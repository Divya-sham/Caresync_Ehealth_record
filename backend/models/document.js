const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    fileUrl:String,
    fileName:String,
    fileType:String,
    uploadedAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Document',DocumentSchema);