const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    medicalHistory:[String],
    diagnoses:[String],
    medications:[String],
    allergies:[String],
    immunizations:[String],
    });

module.exports = mongoose.model("HealthRecord",healthRecordSchema);