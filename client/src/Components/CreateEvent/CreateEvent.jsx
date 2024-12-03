import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event created:", eventDetails);
  };

  return (
    <div className="create-event-container">
      <div className="background-block">
        <div className="create-event-content">
          <div className="event-header">
            <Link to="/home" className="back-button">
              <ArrowLeft size={24} />
              Back to Home
            </Link>
            <h2>Create a New Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label>
                <Info className="input-icon" size={20} />
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={eventDetails.name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Calendar className="input-icon" size={20} />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Clock className="input-icon" size={20} />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <MapPin className="input-icon" size={20} />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Users className="input-icon" size={20} />
                Maximum Capacity
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={eventDetails.maxParticipants}
                onChange={handleChange}
                placeholder="Enter whats he max amount of people that can come"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>
                <Info className="input-icon" size={20} />
                Description
              </label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows="4"
              />
            </div>

            <div className="button-group">
              <button type="button" className="cancel-button" onClick={() => window.history.back()}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;