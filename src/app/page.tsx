// src/app/page.tsx
'use client';

import { useState } from 'react';
import Inbox from '@/app/components/Inbox';
import ChatWindow from '@/app/components/ChatWindow';

const mockConversations = [
  {
    id: 1,
    property: 'Cozy Mountain Cabin',
    user: 'John Doe',
    messages: [
      { sender: 'John Doe', text: 'Hey! Is the property available?', timestamp: '10:00 AM' },
      { sender: 'You', text: 'Yes, it is available!', timestamp: '10:05 AM' },
    ],
  },
  {
    id: 2,
    property: 'Beachside Bungalow',
    user: 'Jane Smith',
    messages: [
      { sender: 'Jane Smith', text: 'Can I get an early check-in?', timestamp: '11:00 AM' },
    ],
  },
];

export default function Home() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (text: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, { sender: 'You', text, timestamp: new Date().toLocaleTimeString() }],
            }
          : conv
      )
    );
  };

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId);

  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r">
        <Inbox conversations={conversations} onSelectConversation={handleSelectConversation} />
      </div>
      <div className="w-2/3">
        <ChatWindow conversation={activeConversation} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}