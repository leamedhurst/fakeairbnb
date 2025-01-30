// components/ChatWindow.jsx
'use client';
import React, { useState } from 'react';

const ChatWindow = ({ conversation, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!conversation) {
    return <div className="p-4">Select a conversation to start chatting</div>;
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">{conversation.property} - {conversation.user}</h2>
      <div className="flex-grow overflow-y-auto border p-2 mb-4">
        {conversation.messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}:</strong> <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border rounded p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
