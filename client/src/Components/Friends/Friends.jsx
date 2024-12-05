import React from 'react';
import './Friends.css';

const Friends = () => {
  
  const friends = ['Alice', 'Charlie', 'David', 'Eva', 'James'];

  return (
    <div className="friends">
      <h3>Friends</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
