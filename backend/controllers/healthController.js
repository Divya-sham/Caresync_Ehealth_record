const HealthRecord = require('../models/healthRecord');
const Encounter = require('../models/encounter');
const Document = require('../models/document');
const User = require('../models/userModel');

const path = require('path');
const fs = require('fs');

exports.getHealthRecord = async(req,res)=>{
    try{
        const record = await HealthRecord.findOne({userId:req.user.id});
        if (!record) {
        return res.json({
            medicalHistory: [],
            medications: [],
            allergies: [],
            diagnoses: [],
            immunizations: [],
        }); // return empty record instead of 404
        }
        res.json(record);
    }
    catch(err){
        res.status(500).json({message:'Server error'});
    }
}

exports.updateHealthRecord = async(req,res)=>{
    try{
        console.log('REQ.USER:', req.user);
        console.log('Payload:', req.body);
        const record = await HealthRecord.findOneAndUpdate(
            {userId:req.user.id},
            {$set:req.body},
            {new:true,upsert:true}
        );
        res.json(record);
    }
    catch(err){
        console.error('Update Error:', err);
        res.status(500).json({message:'Could not update record'});
    }
};

exports.getEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.find({ userId: req.user.id });
    res.json(encounters);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch encounters' });
  }
};

exports.addEncounter=async(req,res)=>{
    try{
        const {doctor,visitNotes,treatmentPlan,labResults,patientId}=req.body;
        let userId=req.user.id;

        if(req.user.role === 'provider'){
            if(!patientId){
                return res.status(400).json({message:'Patient ID is required for providers'});
            }
            const patient = await User.findById(patientId)
            if(!patient || patient.role !== 'patient'){
                return res.status(404).json({message:'Invalid patient ID'});
            }
            userId=patientId;
        }
        const encounter = new Encounter({
            userId,
            doctor,
            visitNotes,
            treatmentPlan,
            labResults,
        });
        await encounter.save();
        res.status(201).json(encounter);
    }
    catch(err){
        console.error('Encounter Error',err);
        res.status(500).json({message:'Failed to add encounter'});
    }
}

exports.uploadDocument = async(req,res)=>{
    try{
        if(!req.file) return res.status(400).json({message:'No file uploaded'});

        const doc = new Document({
            userId:req.user.id,
            fileUrl:`/uploads/${req.file.filename}`,
            fileName:req.file.originalname,
            fileType:req.body.fileType || req.file.mimetype || 'other'
        });
        await doc.save();
        res.status(201).json(doc);
    }
    catch(err){
        res.status(500).json({message:'Failed to upload document'});
    }
}

exports.getDocuments = async(req,res)=>{
    try{
        const doc = await Document.find({userId:req.user.id});
        res.json(doc);
    }
    catch(err){
        res.status(500).json({message:'Falied to fetch documents'});
    }
}

exports.deleteDocument = async (req,res)=>{
    try{
        const doc = await Document.findById(req.params.id);
        if (!doc || doc.userId.toString() !== req.user.id)
            return res.status(404).json({message:'Document not found'});
        const filePath = path.join(__dirname,'..',doc.fileUrl);
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        await doc.deleteOne();
        res.json({message:'Document deleted'});
    }
    catch(err){
        res.status(500).json({message:'Failed to delete document'});
    }
}
