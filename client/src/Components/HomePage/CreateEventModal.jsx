// import React, { useState } from 'react';
// import { do_api_request, dateToDatetime } from '../APIHandler.jsx'
// import { ArrowLeft, Calendar, Clock, MapPin, Users, Info, X } from 'lucide-react';
// import './CreateEvent.css';

// export const CreateEventModal = ({ toggleModal, user_id }) => {
//   const [eventDetails, setEventDetails] = useState({
//     name: '',
//     date: '',
//     time: '',
//     location: '',
//     description: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);

//     if (eventDetails.name.trim()) {
//         console.log(eventDetails.date);
//         console.log(eventDetails.time);
//         const info_resp = await do_api_request(`./post/addEventInfo`, {title: eventDetails.name, location: eventDetails.location, start_time: null}, "POST");
//         if (!info_resp.errorMessage) {
//             const event_info = info_resp.result;
//             const resp = await do_api_request(`./post/addPost`, {owner_user: user_id, parent_post: null, event_info: event_info.event_info_id, text: eventDetails.description}, "POST");
//         } else {
//             setErr(resp.errorMessage)
//         }
//         postRouter.post("/addPost", postController.addPost);  // owner_user, parent_post, event_info, text
//         const event_resp = await do_api_request(`./post/addPost`, {owner_user: user_id, parent_post: null, event_info: null, text: postContent}, "POST");
  
//         if (resp.errorMessage) {
//             setErr(resp.errorMessage)
//         } else {
//             closeModal(true);
//         }
//     } else {
//         setErr("Textbox must contain some text.")
//     }

//     console.log('Event created:', eventDetails);
//     // Add your event creation logic here

//     toggleModal(); // Close the modal after submission
//     setLoading(false);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content create-event-modal">
//         <span className="close-button" onClick={toggleModal}>
//           <X size={24} />
//         </span>
//         <h2>Create a New Event</h2>

//         <form onSubmit={handleSubmit} className="event-form">
//           <div className="form-group">
//             <label>
//               <Info className="input-icon" size={20} />
//               Event Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={eventDetails.name}
//               onChange={handleChange}
//               placeholder="Enter event name"
//               required
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>
//                 <Calendar className="input-icon" size={20} />
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={eventDetails.date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <Clock className="input-icon" size={20} />
//                 Time
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 value={eventDetails.time}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>
//               <MapPin className="input-icon" size={20} />
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               value={eventDetails.location}
//               onChange={handleChange}
//               placeholder="Enter event location"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>
//               <Users className="input-icon" size={20} />
//               Maximum Capacity
//             </label>
//             <input
//               type="number"
//               name="maxParticipants"
//               value={eventDetails.maxParticipants}
//               onChange={handleChange}
//               placeholder="Enter maximum number of participants"
//               min="1"
//             />
//           </div>

//           <div className="form-group">
//             <label>
//               <Info className="input-icon" size={20} />
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={eventDetails.description}
//               onChange={handleChange}
//               placeholder="Enter event description"
//               rows="4"
//             />
//           </div>

//           <div className="button-group">
//             <button
//               type="button"
//               className="cancel-button"
//               onClick={toggleModal}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="submit-button">
//               Create Event
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
