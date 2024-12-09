import React from 'react';
import './HomePage.css';
import { Heart, MailOpen, MessageSquareMore } from 'lucide-react';

export const Button = {
  LIKE: 0,
  COMMENT: 1,
  RSVP: 2
};

export const ReactionButton = ({post_id, icon, active, handle_func, num}) => {
  console.log({ post_id, icon, active, num });

  return (
    <div className="action-item">
      {icon === Button.LIKE ? (
        <Heart size={24} className={`action-icon ${active ? 'liked' : ''}`} onClick={handle_func} />
      ) : icon === Button.COMMENT ? (
        <MessageSquareMore size={24} className="action-icon" onClick={handle_func} />
      ) : icon === Button.RSVP ? (
        <MailOpen size={24} className={`action-icon ${active ? 'rsvp-going' : ''}`} onClick={handle_func} />
      ) : (
        <>You shouldn't be seeing this</>
      )}
      <span className="action-counter">{num}</span>
    </div>
  );
};
