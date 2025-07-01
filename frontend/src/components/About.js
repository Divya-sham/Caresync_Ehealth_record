import React from 'react'
import { FaUserMd, FaFileMedical, FaCalendarCheck } from 'react-icons/fa';
function About() {
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className='relative w-full h-64 md:h-80 lg:h-96 overflow-hidden'>
            <img src='/home.jpg' alt='About Us' className='w-full h-full object-cover'/>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-bold text-white">About CareSync</h1>
            </div>
        </div>
        <div className="bg-blue-50">
        <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-center">Empowering Healthcare, One Click at a Time</h2>
          <p className="mb-6 text-center text-gray-600">
            CareSync bridges the gap between patients and healthcare providers, enabling secure access to health records, easy document uploads,
            and quick appointment bookings.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition">
              <FaUserMd className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Provider Access</h3>
              <p className="text-gray-600">Doctors can manage records and update treatment plans seamlessly.</p>
            </div>

            <div className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition">
              <FaFileMedical className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Digital Records</h3>
              <p className="text-gray-600">Upload, view, and download medical reports anytime, anywhere.</p>
            </div>

            <div className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition">
              <FaCalendarCheck className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Easy Appointments</h3>
              <p className="text-gray-600">Book and manage appointments with just a few clicks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;