"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';


import { useState } from 'react';

const dummyFeedback = [
  { id: 1, text: 'This is an example feedback item 1.' },
  { id: 2, text: 'This is an example feedback item 2.' },
  { id: 3, text: 'This is an example feedback item 3.' },
];

export default function Feedback() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your logic to submit feedback here, e.g., send a request to your server
    const newFeedback = { id: Date.now(), text: feedback };
    setFeedback('');
    setDummyFeedback([...dummyFeedback, newFeedback]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700 font-bold mb-2">Your Feedback</label>
            <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Feedback</button>
          </div>
        </form>
      </div>
    </div>
  );
}