const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['patient','provider'],required:true},

    age:Number,
    gender:String,
    address:String,
    emergencyContact:{
        name:String,
        phone:String,
        relation:String
    },
    insurance:{
        provider:String,
        policyNumber:String,
        validTill:Date
    },
    medicalHistory:[String],

    clinicName:String,
    qualification:String,
    experience:String,
    specializations:[String],
    availability:[String]
});

module.exports = mongoose.model('User',userSchema);