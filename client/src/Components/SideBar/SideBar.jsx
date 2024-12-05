import React from 'react';
import Events from '../Events/Events';
import Friends from '../Friends/Friends';
import './SideBar.css';

const Sidebar = ({ events, friends }) => {
  return (
    <div className="sidebar">
      <Events events={events} />
      <Friends friends={friends} />
    </div>
  );
};

export default Sidebar;
