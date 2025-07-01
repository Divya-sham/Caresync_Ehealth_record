exports.isProvider = (req,res,next)=>{
    if(req.user.role !== 'provider'){
        return res.status(403).json({message:'Access denied. Provider only.'});
    }
    next();
}