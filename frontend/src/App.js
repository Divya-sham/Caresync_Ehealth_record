import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import DocumentUpload from './components/Health/DocumentUpload';
import EncounterRecords from './components/Health/EncounterRecords';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Appointment from './components/Appointment';

function App(){
    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/documents' element={<DocumentUpload/>}/>
                <Route path='/encounters' element={<EncounterRecords/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/appointments' element={<Appointment/>}/>
            </Routes>
        </Router>
    )
}

export default App;