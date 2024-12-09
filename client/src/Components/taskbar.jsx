import React from 'react';
import { Link  } from 'react-router-dom';
import { Home, User, CalendarDays, Tickets } from 'lucide-react';
import LogoutButton from "./logoutButton.jsx";

export const Taskbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home" className="link"><div>Home</div><Home size={24}/></Link></li>
        <li><Link to="/calendar" className="link"><div>Calendar</div><CalendarDays size={24} /></Link></li>
        <li><Link to="/events" className="link"><div>Events</div><Tickets size={24} /></Link></li>
        <li><Link to="/profile" className="link"><div>Profile</div><User size={24} /></Link></li>
        <li><LogoutButton /></li>
      </ul>
    </nav>
  );
};