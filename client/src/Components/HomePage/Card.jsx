import React from 'react';
import './Card.css'; // Ensure the path is correct

const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
