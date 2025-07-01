import React,{useState,useEffect,useCallback} from 'react'
import axios from '../../api';
import { getUserFromToken } from '../../utils/auth';

function EncounterRecords() {
  const [encounters,setEncounters] = useState([]);
  const [form,setForm] = useState({
    patientId:'',
    doctor:'',
    visitNotes:'',
    treatmentPlan:'',
    labResults:''
  });

  const [message,setMessage] = useState('');
  const token = localStorage.getItem('token');
  const user = getUserFromToken();
  const isProvider = user?.role === 'provider';
  const [patients,setPatients] = useState([]);

  const fetchEncounters = useCallback(async () => {
    try {
      const res = await axios.get('/encounters', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEncounters(res.data);
    } catch {
      setMessage('Failed to load encounters');
    }
  },[token]);

  const fetchPatients = useCallback(async () => {
    try {
      const res = await axios.get('/users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch {
      setMessage('Failed to load patients');
    }
  },[token]);

  useEffect(() => {
    fetchEncounters();

    if (isProvider) {
      fetchPatients();
    }
  }, [fetchEncounters, fetchPatients, isProvider]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProvider && !form.patientId) {
      setMessage('Please select a patient');
      return;
    }

    try {
      await axios.post(
        '/encounters',
        {
          ...form,
          ...(isProvider ? { patientId: form.patientId } : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Encounter added successfully');
      setForm({ doctor: '', visitNotes: '', treatmentPlan: '', labResults: '' });
      fetchEncounters();
    } catch {
      setMessage('Failed to add encounter');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10 px-4'>
    <div className='max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Encounter Records</h2>
      {isProvider && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <select name='patientId' value={form.patientId} onChange={handleChange}>
            <option value="">Select a patient</option>
            {patients.map(p=>(
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <input
            type="text"
            name="doctor"
            placeholder="Doctor Name"
            value={form.doctor}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="visitNotes"
            placeholder="Visit Notes"
            value={form.visitNotes}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="treatmentPlan"
            placeholder="Treatment Plan"
            value={form.treatmentPlan}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          <textarea
            name="labResults"
            placeholder="Lab Results"
            value={form.labResults}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Add Encounter
          </button>
        </form>
      )}

      {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}

      <div className="space-y-4">
        {encounters.map((enc) => (
          <div
            key={enc._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <p><strong>Date:</strong> {new Date(enc.date).toLocaleDateString()}</p>
            <p><strong>Doctor:</strong> {enc.doctor}</p>
            <p><strong>Visit Notes:</strong> {enc.visitNotes}</p>
            <p><strong>Treatment Plan:</strong> {enc.treatmentPlan}</p>
            <p><strong>Lab Results:</strong> {enc.labResults}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default EncounterRecords;