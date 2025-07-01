import React,{useState} from 'react';
import PersonalHealth from '../components/Health/PersonalHealth';
import EncounterRecords from '../components/Health/EncounterRecords';
import DocumentUpload from '../components/Health/DocumentUpload';

const tabs = ['Personal Health','Encounters','Documents'];

const HealthPage =()=>{
    const [activeTab,setActiveTab] = useState('Personal Health');
    return(
        <div className='min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-10 px-4'>
            <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6'>
                <h1 className='text-3xl font-bold mb-6 tex-center text-teal-700'>Health Records</h1>
                <div className='flex justify-center space-x-4 mb-6'>
                    {tabs.map((tab) =>(
                        <button key={tab} onClick={()=>setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                            ${activeTab === tab ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div>
                    {activeTab === 'Personal Health' && <PersonalHealth/>}
                    {activeTab === 'Encounters' && <EncounterRecords/>}
                    {activeTab === 'Documents' && <DocumentUpload/>}
                </div>
            </div>
        </div>
    )
}
export default HealthPage;