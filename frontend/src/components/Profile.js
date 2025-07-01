import React,{useState,useEffect} from 'react';
import axios from '../api'

const Profile = ()=>{
    const [user,setUser] = useState({
        name:'',
        email:'',
        role:'',
        age:'',
        gender:'',
        address:'',
        emergencyContact:{name:'',phone:'',relation:''},
        insurance:{provider:'',policyNumber:'',validTill:''},
        medicalHistory:[],
        clinicName:'',
        qualification:'',
        experience:'',
        specializations:[],
        availability:[]
    });

    const [message,setMessage]=useState('');

    const token = localStorage.getItem('token');
    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const res=await axios.get('/users/profile',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                const fallback = {
                name: '',
                email: '',
                role: '',
                age: '',
                gender: '',
                address: '',
                emergencyContact: { name: '', phone: '', relation: '' },
                insurance: { provider: '', policyNumber: '', validTill: '' },
                medicalHistory: [],
                clinicName: '',
                qualification: '',
                experience: '',
                specializations: [],
                availability: []
              };

              setUser({ ...fallback, ...res.data });
            }
            catch(err){
                setMessage(err.response?.data?.message || 'Failed to load profile');
            }
        };
        fetchProfile();
    },[token]);

    const handleChange=(e)=>{
        const {name,value}=e.target;

        if(name.includes('.')){
            const [outer,inner]=name.split('.');
            setUser((prev)=>({
                ...prev,
                [outer]:{
                    ...prev[outer],
                    [inner]:value
                }
            }));
        }else{
            setUser((prev)=>({
                ...prev,
                [name]:value,
            }));
        }
    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.put('/users/profile',user,{
                headers:{Authorization:`Bearer ${token}`}
            });
            setUser(res.data);
            setMessage('Profile updated successfully');
        }
        catch(err){
            setMessage(err.response?.data?.message || 'Update failed');
        }
    }
    return (
  <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10 px-4'>
    <div className='max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg'>
    <h2 className='text-3xl font-bold text-center text-teal-900 mb-6'>Profile Update</h2>
    <form onSubmit={handleUpdate} className='space-y-6'>

      {/* Common Fields */}
      <div>
        <h3 className='text-xl font-semibold mb-2 text-teal-700'>Basic Informaation</h3>
        <div className='grid md-gris-cols-2 gap-4'>
          <input name="name" value={user.name} onChange={handleChange} placeholder="Enter your name"
          className="p-3 border border-gray-300 rounded-lg w-full" />
        
          <input name="email" value={user.email} onChange={handleChange} placeholder="Enter your email"
          className="p-3 border border-gray-300 rounded-lg w-full" />
          
          <input value={user.role} disabled
          className="p-3 border border-gray-300 rounded-lg w-full" />
        </div>
      </div>
      
      {/* Patient Fields */}
      {user.role === 'patient' && (
        <>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-teal-700">Patient Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
              <input type="number" name="age" value={user.age} onChange={handleChange} placeholder="Age"
              className="p-3 border border-gray-300 rounded-lg w-full" />
              <input name="gender" value={user.gender} onChange={handleChange} placeholder="Gender"
              className="p-3 border border-gray-300 rounded-lg w-full" />
              <input name="address" value={user.address} onChange={handleChange} placeholder="Address"
              className="p-3 border border-gray-300 rounded-lg w-full md:col-span-2" />
          </div>
        </div>

              <div>
                <h4 className="text-lg font-medium mt-4 mb-2 text-teal-700">Emergency Contact</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <input name="emergencyContact.name" value={user.emergencyContact.name} onChange={handleChange}
                    placeholder="Name" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="emergencyContact.phone" value={user.emergencyContact.phone} onChange={handleChange}
                    placeholder="Phone" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="emergencyContact.relation" value={user.emergencyContact.relation} onChange={handleChange}
                    placeholder="Relation" className="p-3 border border-gray-300 rounded-lg w-full" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mt-4 mb-2 text-teal-700">Insurance</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <input name="insurance.provider" value={user.insurance.provider} onChange={handleChange}
                    placeholder="Provider" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="insurance.policyNumber" value={user.insurance.policyNumber} onChange={handleChange}
                    placeholder="Policy #" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input type="date" name="insurance.validTill" value={user.insurance.validTill?.slice(0, 10)} onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg w-full" />
                </div>
              </div>

              <textarea
                name="medicalHistory"
                value={user.medicalHistory.join(',')}
                onChange={(e) => setUser({ ...user, medicalHistory: e.target.value.split(',') })}
                placeholder="Medical History (e.g. Asthma, Diabetes)"
                className="p-3 border border-gray-300 rounded-lg w-full mt-4"
              />
            </>
          )}
      {/* Provider Fields */}
          {user.role === 'provider' && (
            <>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-teal-700">Provider Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="clinicName" value={user.clinicName} onChange={handleChange}
                    placeholder="Clinic Name" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="qualification" value={user.qualification} onChange={handleChange}
                    placeholder="Qualification" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="experience" value={user.experience} onChange={handleChange}
                    placeholder="Experience (years)" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="specializations" value={user.specializations.join(',')} onChange={(e) =>
                    setUser({ ...user, specializations: e.target.value.split(',') })}
                    placeholder="Specializations (e.g. Cardiology)" className="p-3 border border-gray-300 rounded-lg w-full" />
                  <input name="availability" value={user.availability.join(',')} onChange={(e) =>
                    setUser({ ...user, availability: e.target.value.split(',') })}
                    placeholder="Availability (e.g. Mon 10-2)" className="p-3 border border-gray-300 rounded-lg w-full" />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              Update Profile
            </button>
          </div>

          {message && <p className="text-center text-red-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;