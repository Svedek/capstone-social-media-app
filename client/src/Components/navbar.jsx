import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { Home, User, MessageSquare, CalendarDays, Tickets, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link><Home size={24} /></li>
        <li><Link to="/calendar">Calendar</Link><CalendarDays size={24} /></li>
        <li><Link to="/events">Events</Link><Tickets size={24} /></li>
        <li><Link to="/profile">Profile</Link><User size={24} /></li>
        <li><Link to="/messages">Messages</Link><MessageSquare size={24} /></li>
        <li><Link to="/settings">Settings</Link><Settings size={24} /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
