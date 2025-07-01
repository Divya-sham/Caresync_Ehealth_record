import React from 'react'
import {Link,useNavigate} from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/');
    };

  return (
    <nav className='bg-teal-600 text-white px-6 py-3 flex justify-between items-center shadow'>
        <div className='text-xl font-bold'>CareSync</div>
        <div className='flex gap-4 items-center'>
            <Link to="/home" className='hover:underline'>Home</Link>
            <Link to="/about" className='hover:underline'>About Us</Link>
            <Link to="/dashboard" className='hover:underline'>Dashboard</Link>
            <button onClick={handleLogout} className='bg-red-500 px-3 py-1 rounded hover:bg-red-600'>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar