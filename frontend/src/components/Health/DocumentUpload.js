import React,{useState,useEffect,useCallback} from 'react'
import axios from '../../api';

const DocumentUpload=()=> {
  const [documents,setDocuments] = useState([]);
  const [file,setFile] = useState(null);
  const [message,setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await axios.get('/documents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      setMessage('Failed to load documents');
    }
  }, [token]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);


  const handleUpload = async(e)=>{
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file',file);

    try{
      await axios.post('/documents',formData,{
        headers:{Authorization:`Bearer ${token}`,
      'Content-Type':'multipart/form-data'}
      });
      setMessage('Uploaded successfully');
      setFile(null);
      fetchDocuments();
    }
    catch(err){
      setMessage('Upload failed');
    }
  }

  const handleDelete = async(id)=>{
    if(!window.confirm('Are you sure you want to delete this document?')) return ;
    try{
      await axios.delete(`/documents/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
      });
      setMessage('Deleted successfully');
      fetchDocuments();
    }
    catch(err){
      setMessage('Delete failed');
    }
  }
  return (
  <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10 px-4'>
  <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Medical Documents</h2>

    <form onSubmit={handleUpload} className='flex flex-col sm:flex-row items-center gap-4 mb-6'>  
      <input
        type='file'
        onChange={(e) => setFile(e.target.files[0])}
        className='block w-full sm:w-auto border border-gray-300 rounded px-4 py-2'
      />
      <button
        type='submit'
        className='bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-all duration-200'
      >
        Upload
      </button>
    </form>

    {message && <p className='text-sm text-center mb-4 text-gray-600'>{message}</p>}

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {documents.map((doc) => (
        <div key={doc._id} className='border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition'>
          <div className='flex items-center justify-between gap-4'>
            <a
              href={`http://localhost:8000${doc.fileUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 font-medium hover:underline truncate'
            >
              {doc.fileName}
            </a>
            <button
              onClick={() => handleDelete(doc._id)}
              className='text-red-500 text-sm hover:underline ml-4'
            >
              Delete
            </button>
          </div>
        </div>
        
      ))}
    </div>
  </div>
  </div>
);

}

export default DocumentUpload