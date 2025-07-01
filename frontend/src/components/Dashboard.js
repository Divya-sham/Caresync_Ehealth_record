import React, { useState } from 'react'
import Profile from './Profile';
import EncounterRecords from './Health/EncounterRecords';
import DocumentUpload from './Health/DocumentUpload';
import PersonalHealth from './Health/PersonalHealth';
import { getUserFromToken } from '../utils/auth';
import Appointment from './Appointment';

function Dashboard() {
    const user = getUserFromToken();
    const isPatient = user?.role === 'patient';

    const patientTabs = [
    { label: 'Profile', component: <Profile/> },
    { label: 'Personal Health', component: <PersonalHealth /> },
    { label: 'Encounter Records', component: <EncounterRecords /> },
    { label: 'Documents', component: <DocumentUpload /> },
    { label: 'Book appointment',component: <Appointment/>}
  ];

  const providerTabs = [
    { label: 'Profile', component: <Profile/> },
    { label: 'Encounter Records', component: <EncounterRecords /> },
  ];

  const tabsToUse = isPatient ? patientTabs : providerTabs;

  const [activeTab,setActiveTab] = useState(tabsToUse[0].label);

  return (
    <div className='flex min-h-screen bg-gray-100'>
        <aside className='w-64 bg-white shadow-lg p-6'>
            <h2 className="text-xl font-bold mb-6 text-teal-700">Dashboard</h2>
        <nav className="space-y-2">
          {tabsToUse.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === tab.label
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        </aside>
        <main className="flex-1 p-6">
        {tabsToUse.find((tab) => tab.label === activeTab)?.component}
        </main>
    </div>
  )
}

export default Dashboard