import React,{useState} from 'react';
import axios from '../api';
import {useNavigate,Link} from 'react-router-dom';

const Login = () => {
  const [form,setForm] = useState({email:'',password:''});
  const [message,setMessage]=useState('');
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res=await axios.post('/auth/login',form);
        localStorage.setItem('token',res.data.token);
        setMessage('Login successful');
        navigate('/home');
    }
    catch(err){
        setMessage(err.response?.data?.message || 'Login failed');
    }
  }
  return(
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100'>
        <form className='bg-white p-10 rounded-xl shadow-xl w-full max-w-md' onSubmit={handleSubmit}>
            <h2 className='text-3xl font-semibold text-center text-blue-900 mb-6'>Login</h2>
            <input name='email' type='email' placeholder='Email' onChange={handleChange} required 
            className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'/><br/>
            <input name='password' type='password' placeholder='Password' onChange={handleChange} required
            className='w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2'/><br/>
            <button type='submit' 
            className='w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200'>Login</button>
            <p className="mt-4 text-sm text-gray-700 text-center">Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
            </p>
        </form>
    </div>
  )
}

export default Login