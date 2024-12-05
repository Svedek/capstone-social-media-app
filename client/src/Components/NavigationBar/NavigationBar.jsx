import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import the new CSS file
import { Home, User, MessageSquare, CalendarDays, Tickets, Settings } from 'lucide-react';
import LogoutButton from '../logoutButton'; // Import the LogoutButton component

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home <Home size={24} /></Link></li>
        <li><Link to="/calendar">Calendar <CalendarDays size={24} /></Link></li>
        <li><Link to="/events">Events <Tickets size={24} /></Link></li>
        <li><Link to="/profile">Profile <User size={24} /></Link></li>
        <li><Link to="/messages">Messages <MessageSquare size={24} /></Link></li>
        <li><Link to="/settings">Settings <Settings size={24} /></Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
