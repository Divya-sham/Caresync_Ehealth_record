const mongoose = require('mongoose');

const EncounterSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    date:{type:Date,default:Date.now},
    doctor:String,
    visitNotes:String,
    treatmentPlan:String,
    labResults:String
},{timestamps:true});

module.exports = mongoose.model('Encounter',EncounterSchema);