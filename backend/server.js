const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectdb = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/healthRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

connectdb();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Backend is running");
})
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api',healthRoutes);
app.use('/uploads',express.static('uploads'));
app.use('/api/appointments',appointmentRoutes);

const PORT=process.env.PORT||8000;
app.listen(PORT,()=>console.log('server is running on port 8000'));