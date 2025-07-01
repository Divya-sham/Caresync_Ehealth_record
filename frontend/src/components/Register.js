import React,{useState} from 'react';
import axios from '../api';

const Register=()=>{
    const [form,setForm]=useState({name:'',email:'',password:'',role:''});
    const [message,setMessage]=useState('');

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('/auth/register',form);
            setMessage(res.data.message);
        }
        catch(err){
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    }

    return(
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100'>
            <form onSubmit={handleSubmit} className='bg-white p-10 rounded-xl shadow-xl w-full max-w-md'>
                <h2 className='text-3xl font-semibold text-center text-blue-900 mb-6'>Register</h2>
                <input name='name' placeholder='Name' onChange={handleChange} required
                className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'/><br/>
                <input name='email' type='email' placeholder='Email' onChange={handleChange} required
                className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'/><br/>
                <input name='password' type='password' placeholder='Password' onChange={handleChange} required
                className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'/><br/>
                <select name='role' onChange={handleChange}
                className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'>
                    <option value="patient">Patient</option>
                    <option value="provider">Provider</option>
                </select><br/>
                <button type='submit'
                className='w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200'>Register</button>
            </form>
            <p className='mt-4 text-center text-sm text-red-500'>{message}</p>
        </div>
    )
}

export default Register;