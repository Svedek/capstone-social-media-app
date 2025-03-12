import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { CreateEventModal } from './CreateEventModal'; 

export const Sidebar = (props) => {
  const {user_id} = props.props;

  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  const events = [
     { id: 1, name: 'Community Picnic', date: '2024-10-15' },
     { id: 2, name: 'Tech Meetup', date: '2024-10-20' },
     { id: 3, name: 'Career Fair', date: '2024-10-20' },
     { id: 4, name: 'Library Event', date: '2024-10-20' },
     { id: 5, name: 'Gym Event', date: '2024-10-20' },
   ];
  
  const hideModal = (postCreated) => {
    if (postCreated) {
      window.location.reload();  // Refresh page so that you can see your created post
    }
    setIsCreateEventModalOpen(false);
  };

   return (
    <>
      <div className="sidebar">
        <div className="events">
          <h3>Upcoming Events</h3>
          <ul>
            {events.map(event => (
              <li key={event.id}>{event.name} - {event.date}</li>
            ))}
          </ul>
          <button 
            className="CreateEvent" 
            onClick={() => setIsCreateEventModalOpen(true)}
          >
            Create Event
          </button>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://x.com/UWM?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.facebook.com/UWMilwaukee/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/uwmilwaukee/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com/school/uwmilwaukee/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {isCreateEventModalOpen && (
        <CreateEventModal hideModal={hideModal} user_id={user_id} />
      )}
    </>
  );
};
