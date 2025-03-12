import React, { useState } from 'react';
import './EventsPage.css';

const mockEvents = [
  { id: 1, title: "Campus movies", date: "2024-10-20", time: "20:00", location: "Student Center", description: "at sanburg" },
  { id: 2, title: "testtestets", date: "2024-10-22", time: "10:00", location: "fairlife choclate milk", description: "Meet potential employers and explore career opportunities." },
  { id: 3, title: "carrer fair", date: "2024-10-25", time: "08:00", location: "Sports Field", description: "rahhhhhh!" },
  { id: 4, title: "gym ", date: "2024-10-27", time: "14:00", location: "gym", description: "freeeee " },
  { id: 5, title: "happy time", date: "2024-10-30", time: "11:00", location: "Art Gallery", description: "rahhhhhhhhhh" },
  
  { id: 5, title: "rahhhh", date: "2024-10-30", time: "11:00", location: "Afart", description: "fart" },

];

const EventsPage = () => {
  const [events] = useState(mockEvents);
  const [filter, setFilter] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(filter.toLowerCase()) ||
    event.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="events-page">
      <header>
        <h1>Events At UWM</h1>
      </header>
      <main>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="events-list">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p className="event-date">{event.date} at {event.time}</p>
              <p className="event-location">{event.location}</p>
              <p className="event-description">{event.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;