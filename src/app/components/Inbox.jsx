// components/Inbox.jsx
'use client';
import React from 'react';

const Inbox = ({ conversations, onSelectConversation }) => {
  return (
    <div className="p-4 border-r h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="p-2 border-b cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectConversation(conv.id)}
        >
          <h3 className="font-semibold">{conv.property}</h3>
          <p className="text-sm text-gray-600">
            <strong>{conv.user}:</strong> {conv.messages[conv.messages.length - 1]?.text || "No messages yet"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
