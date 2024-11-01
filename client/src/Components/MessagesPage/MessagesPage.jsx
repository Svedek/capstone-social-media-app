import React, { useState } from 'react';
import Navbar from '../navbar.jsx';
import './MessagesPage.css';

const initialContacts = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const initialChats = {
  1: [
    { id: 1, sender: 'Alice', content: 'got money?' },
    { id: 2, sender: 'You', content: 'test test tetttt testtttt' },
  ],
  2: [
    { id: 1, sender: 'Bob', content: 'do you got like 45 dollars' },
    { id: 2, sender: 'You', content: 'test hehe haha' },
  ],
  3: [
    { id: 1, sender: 'Charlie', content: 'test test test, this is for testing' },
    { id: 2, sender: 'You', content: 'tsets tsets sets' },
  ],
};

const MessagesPage = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeChat) {
      const updatedChats = {
        ...chats,
        [activeChat]: [
          ...chats[activeChat],
          {
            id: chats[activeChat].length + 1,
            sender: 'You',
            content: newMessage.trim(),
          },
        ],
      };
      setChats(updatedChats);
      setNewMessage('');
    }
  };

  return (
    <div className="messages-page">
      <Navbar />
      <div className="contacts-chat-container"> 
        <div className="contacts-list">
          <h2>Contacts</h2>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact ${activeChat === contact.id ? 'active' : ''}`}
              onClick={() => setActiveChat(contact.id)}
            >
              {contact.name}
            </div>
          ))}
        </div>
        <div className="chat-area">
          {activeChat ? (
            <>
              <h2>Chat with {contacts.find(c => c.id === activeChat).name}</h2>
              <div className="message-list">
                {chats[activeChat].map((message) => (
                  <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                    <strong>{message.sender}:</strong> {message.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="message-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">Select a contact to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
