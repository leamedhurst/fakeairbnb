// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Inbox from '@/app/components/Inbox';
import ChatWindow from '@/app/components/ChatWindow';

// Replace with your actual API Gateway URL
const API_URL = 'https://t9tjcj1rud.execute-api.us-east-1.amazonaws.com';

async function fetchConversations() {
  try {
    const response = await fetch(`${API_URL}/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch conversations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
}

async function fetchConversationById(conversationId: number) {
  try {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversation with ID ${conversationId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching conversation ${conversationId}:`, error);
    return null;
  }
}

async function addMessageToConversation(conversationId: number, message: { sender: string; text: string; timestamp: string }) {
  try {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to add message to conversation');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error adding message to conversation ${conversationId}:`, error);
    return null;
  }
}

export default function Home() {
  const [conversations, setConversations] = useState<{ conversationId: number; id?: number; property: string; user: string; messages: any[] }[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [activeConversation, setActiveConversation] = useState<any>(null);

  useEffect(() => {
    fetchConversations().then(setConversations);
  }, []);

  const handleSelectConversation = (id: number) => {
    fetchConversationById(id).then(setActiveConversation);
    setActiveConversationId(id);
  };

  const handleSendMessage = async (text: string) => {
    if (activeConversationId) {
      const message = { sender: 'You', text, timestamp: new Date().toISOString() };
      const updatedConversation = await addMessageToConversation(activeConversationId, message);
      if (updatedConversation) {
        setActiveConversation(updatedConversation);
      }
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r">
      <Inbox
  conversations={conversations}
  onSelectConversation={handleSelectConversation}
/>
      </div>
      <div className="w-2/3">
        <ChatWindow conversation={activeConversation} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
