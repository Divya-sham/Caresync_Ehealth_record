const Appointment = require('../models/appointmentModel');

exports.bookAppointment = async(req,res)=>{
    const {date,time} = req.body;
    const userId = req.user.id;

    if(!date || !time) return res.status(400).json({message:'Date and time are required'});
    try{
        const existing = await Appointment.findOne({date,time});
        if (existing) return res.status(409).json({message:'Slot already booked'});

        const appointment = await Appointment.create({patientId:userId,date,time});
        res.status(201).json(appointment);
    }
    catch(err){
        res.status(500).json({message:'Booking failed'});
    }
}