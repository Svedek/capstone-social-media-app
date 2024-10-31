import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import EditProfilePage from './Components/EditProfilePage/EditProfilePage';
import HomePage from './Components/HomePage/HomePage'; 
import MessagesPage from './Components/MessagesPage/MessagesPage';
import CalenderPage from './Components/CalenderPage/CalenderPage';
import EventsPage from './Components/EventsPage/EventsPage';
import CreateEvent from './Components/CreateEvent/CreateEvent';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit/:userId" element={<EditProfilePage />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/create-event" element={<CreateEvent />} />

      </Routes>
    </Router>
  );
}

export default App;