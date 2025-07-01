const User = require('../models/userModel');

//get patients
exports.getPatients = async(req,res)=>{
    try{
        const patients = await User.find({role:'patient'}).select('_id name');
        res.json(patients);
        console.log('Returning patients:', patients);
    }
    catch(err){
        res.status(500).json({message:'Failed to fetch patients'});
    } 
}

//get profile
exports.getUser = async(req,res)=>{
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({message:'User not found'});
    res.json(user);
}

//update user
exports.updateUser = async(req,res)=>{
    try{
        const userId = req.user.id;
        const updates = req.body;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message:'User not found'});

        const disallowedFields = ['_id', 'password', 'role'];
        disallowedFields.forEach((field) => delete updates[field]);

        Object.assign(user,updates);
        await user.save();
        res.json(user);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

//delete user
exports.deleteUser = async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) res.status(404).json({message:"User not found"});
    res.json({message:'user deleted'});
}