import React, { useState, useEffect } from 'react';
import axios from '../api';

const Home = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/home.jpg"
        alt="Healthcare Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Welcome {user?.name || 'Guest'}!
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          {user
            ? user.role === 'patient'
              ? 'You can view your medical records, book appointments, and upload documents.'
              : 'You can manage patient records and review reports.'
            : 'Please log in to continue.'}
        </p>
      </div>
    </div>
  );
};

export default Home;
