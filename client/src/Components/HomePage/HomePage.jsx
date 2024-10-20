import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css'; 
import './HomePage.css';
import { Home, User, MessageSquare,CalendarDays ,Tickets,Settings  } from 'lucide-react';

const HomePage = () => {
  const posts = [
    { id: 1, author: 'John Doe', content: 'testing, this test, test test' },
    { id: 2, author: 'Jane Smith', content: 'please work , test,test,test' },
    { id: 3, author: 'Bob Johnson', content: 'test 3, test 3, test 333. testtest' },
    { id: 4, author: 'jimbo', content: 'yet another test to cover more space' },
    { id: 5, author: 'jimbos brother', content: 'yet another test to cover more space' },
    { id: 6, author: 'John', content: 'yet another test to cover more space' },
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space' },
    { id: 8, author: 'Anon number2', content: 'yet another test to cover more space' },
    { id: 9, author: 'Anon number3', content: 'yet another test to cover more space' },
    { id: 10, author: 'Anon number4', content: 'yet another test to cover more space' },

  ];

  const events = [
    { id: 1, name: 'Community Picnic', date: '2024-10-15' },
    { id: 2, name: 'Tech Meetup', date: '2024-10-20' },
    { id: 3, name: 'Carrer fair', date: '2024-10-20' },
    { id: 4, name: 'Library event', date: '2024-10-20' },
    { id: 5, name: 'Gym Event', date: '2024-10-20' },
  ];

  const friends = ['Alice', 'Charlie', 'David', 'Eva','James',];

  return (
    <div className="home-page">
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Home</Link><Home size={24} /> </li>
          <li><Link to="/Calender">Calender</Link><CalendarDays size={24} /></li>
          <li><Link to="/Events"> Events</Link><Tickets size={24} /></li>

          <li><Link to="/profile">Profile</Link>  <User size={24} /></li>
          <li><Link to="/messages">Messages</Link>  <MessageSquare size={24} /></li>
          <li><Link to="/settings">Settings</Link> <Settings size={24} /></li>

        </ul>
      </nav>

      <div className="content">
        {/* Calendar added here */}
       

        <div className="main-feed">
          <h2>Your feed</h2>
          <button className="create-post">Create Post</button>
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.author}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default HomePage;
