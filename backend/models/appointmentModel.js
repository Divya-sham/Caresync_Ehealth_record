const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Appointment',appointmentSchema);