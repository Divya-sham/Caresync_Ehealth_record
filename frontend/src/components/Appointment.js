import React,{useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from '../api';

const Appointment = ()=> {
    const [date,setDate] = useState(new Date());
    const [time,setTime] = useState('');
    const [message,setMessage] = useState('');
    const token = localStorage.getItem('token');

    const handleBooking = async()=>{
        try{
            await axios.post(
                '/appointments',
                {date:date.toISOString().split('T')[0],time},
                {headers:{Authorization:`Bearer ${token}`}}
            );
            setMessage('Appointment booked successfully');
        }
        catch(err){
            setMessage('Failed to book appointment');
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl transition duration-300">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">Book an Appointment</h2>

        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg shadow border mx-auto mb-6"
        />

        <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-300 mb-6"
        />

        <button
          onClick={handleBooking}
          className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-teal-700 transition"
        >
          Confirm Booking
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointment;