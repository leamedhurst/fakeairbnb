import { useState } from 'react';

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      property: 'Byron Lodge',
      user: 'Catherine',
      messages: [
        {
          sender: 'Catherine',
          text: message,
          timestamp: new Date().toISOString(),  // Use current timestamp
        },
      ],
    };

    try {
      const response = await fetch('https://t9tjcj1rud.execute-api.us-east-1.amazonaws.com/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setResponseMessage('Message sent successfully!');
        setMessage('');  // Clear the message field
      } else {
        const errorData = await response.json();
        setResponseMessage(`Failed to send message: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setResponseMessage('An error occurred while sending the message.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Send a Message to the Owner</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          className="w-full p-2 border rounded"
          placeholder="Write your message here..."
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
      {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
    </div>
  );
}
