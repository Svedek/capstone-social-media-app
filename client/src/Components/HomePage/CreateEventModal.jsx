import React, { useState } from 'react';
import { do_api_request, dateToDatetime } from '../APIHandler.jsx'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Info, X } from 'lucide-react';
import './CreateEvent.css';

export const CreateEventModal = ({ hideModal, user_id }) => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearEventModal = () => {
    setEventDetails({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
    });
    setErr("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    let inputValid = true;
    
    if (inputValid && !eventDetails.name.trim()) {
      setErr("Textbox must contain some text.");
      inputValid = false;
    }
    const dateParts = eventDetails.date.split(":");
    if (inputValid && (dateParts[0] < "2024" || dateParts[0] > "2099")) { 
      setErr("Event year must be between 2024 and 2099.");
      inputValid = false;
    }

    if (inputValid) {
      setErr('');
      const dateTime = eventDetails.date + ' ' + eventDetails.time + ':00';
      const info_resp = await do_api_request(`./post/addEventInfo`, {title: eventDetails.name, location: eventDetails.location, start_time: dateTime}, "POST");
      if (!info_resp.errorMessage) {
        const event_info_id = info_resp.result;
        const resp = await do_api_request(`./post/addPost`, {owner_user: user_id, parent_post: null, event_info: event_info_id, text: eventDetails.description}, "POST");
        if (!resp.errorMessage) {
          closeModal(true);
        } else {
          setErr(resp.errorMessage);
        }
      } else {
        setErr(info_resp.errorMessage);
      }
    }
    
    setLoading(false);
  };

  const closeModal = (postCreated) => {
    if (loading) return;
    clearEventModal();
    hideModal(postCreated);
  };

  const onExit = () => closeModal(false);
  



  return (
    <div className="modal">
      <div className="modal-content create-event-modal">
        <span className="close-button" onClick={onExit}>
          <X size={24} />
        </span>

        {err && <p className="error-message">{err}</p>}
        <h2>Create a New Event</h2>

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
            <button type="submit" className="submit-button">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
