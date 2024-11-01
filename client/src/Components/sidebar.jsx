import React from 'react';

const Sidebar = ({ events, friends }) => {
  return (
    <div className="sidebar">
      <div className="events">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.name} - {event.date}</li>
          ))}
        </ul>
      </div>

      <div className="friends">
        <h3>Friends</h3>
        <ul>
          {friends.map(friend => (
            <li key={friend}>{friend}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
