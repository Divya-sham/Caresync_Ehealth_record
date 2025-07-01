import React,{useState,useEffect} from 'react';
import axios from '../../api';

const PersonalHealth = ()=>{
    const [health,setHealth]=useState({
        medicalHistory:'',
        medications:'',
        allergies:'',
        immunizations:'',
        diagnoses:''
    });
    const [message,setMessage] = useState('');
    const token = localStorage.getItem('token');
    useEffect(()=>{
        const fetchHealth = async()=>{
            try{
                const res = await axios.get('/health',{
                    headers:{Authorization:`Bearer ${token}`},
                });
                setHealth({
                    medicalHistory:res.data.medicalHistory?.join(',') || '',
                    medications:res.data.medications?.join(',') || '',
                    allergies: res.data.allergies?.join(',') || '',
                    diagnoses: res.data.diagnoses?.join(',') || '',
                });
            }
            catch(err){
                if (err.response?.status === 404) {
                    setHealth({
                    medicalHistory: '',
                    medications: '',
                    allergies: '',
                    diagnoses: '',
                    immunizations: ''
                    });
                setMessage('No health record found. Please fill in your details.');
                } else {
                    setMessage('Failed to load health record');
                }
            }
        };
        fetchHealth();
    },[token]);

    const handleChange = (e)=>{
        setHealth({...health,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post(
                '/health',
                {
                medicalHistory:health.medicalHistory.split(',').map(item=>item.trim()),
                medications:health.medications.split(',').map(item => item.trim()),
                allergies: health.allergies.split(',').map(item => item.trim()),
                immunizations: health.immunizations.split(',').map(item => item.trim()),
                diagnoses: health.diagnoses.split(',').map(item => item.trim()),
                },
                {headers:{Authorization:`Bearer ${token}`}},
            );
            setMessage('Health record updated successfully');
        }
        catch(err){
            setMessage('Failed to update health record');
        }
    };
    return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-teal-900 mb-6">Personal Health Record</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-teal-700 mb-1">Medical History</label>
            <textarea
              name="medicalHistory"
              value={health.medicalHistory}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="e.g. Asthma, Diabetes"
            />
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Medications</label>
            <textarea
              name="medications"
              value={health.medications}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="e.g. Metformin, Aspirin"
            />
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Allergies</label>
            <textarea
              name="allergies"
              value={health.allergies}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="e.g. Penicillin, Nuts"
            />
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Immunizations</label>
            <textarea
              name="immunizations"
              value={health.immunizations}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="e.g. Tetanus, COVID-19"
            />
          </div>

          <div>
            <label className="block font-medium text-teal-700 mb-1">Diagnoses</label>
            <textarea
              name="diagnoses"
              value={health.diagnoses}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="e.g. Hypertension"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              Save
            </button>
          </div>

          {message && (
            <p className="text-center text-sm mt-2 text-teal-700 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalHealth;