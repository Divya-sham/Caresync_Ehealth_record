const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async(req,res)=>{
    const {name,email,password,role}= req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:'User already exists.'});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({name,email,password:hashedPassword,role});
        await user.save();
        res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server error'});
    }
 }

 exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message:'Invalid email or password'});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({message:'Invalid email or password'});

        if (!JWT_SECRET) {
            console.log("JWT_SECRET missing");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET,{expiresIn:'1h'});
        res.json({token,user:{id:user._id,name:user.name,email:user.email,role:user.role}});
    }
    catch(err){
        console.error("Login error:", err);
        res.status(500).json({message:'Server error'});
    }
 }