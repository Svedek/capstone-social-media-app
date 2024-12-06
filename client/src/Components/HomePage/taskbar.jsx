import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './HomePage.css';
import { Home, User, MessageSquare, CalendarDays, Tickets, LogOut } from 'lucide-react';


export const Taskbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here
    sessionStorage.clear(); // Example of clearing session data

    // Redirect to login page and replace history to prevent back navigation
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link><Home size={24} /></li>
        <li><Link to="/calender">Calendar</Link><CalendarDays size={24} /></li>
        <li><Link to="/events">Events</Link><Tickets size={24} /></li>
        <li><Link to="/profile">Profile</Link><User size={24} /></li>
        <li><Link to="/messages">Messages</Link><MessageSquare size={24} /></li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={24} /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
