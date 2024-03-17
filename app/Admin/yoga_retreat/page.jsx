"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function YogaRetreat() {
  const [yogaRetreats, setYogaRetreats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRetreat, setNewRetreat] = useState({ retreatName: "", date: "", ancillary_activity: "", meal: "", price: "" });
  const [selectedRetreat, setSelectedRetreat] = useState(null);

  useEffect(() => {
    fetchYogaRetreats();
  }, []);

  const fetchYogaRetreats = async () => {
    try {
      const response = await fetch('http://localhost:9091/yogaretreat');
      const data = await response.json();
      setYogaRetreats(data);
    } catch (error) {
      console.error('Error fetching yoga retreats:', error);
    }
  };

  const handleDeleteYogaRetreat = async (id) => {
    try {
      await fetch(`http://localhost:9091/yogaretreat/${id}`, {
        method: 'DELETE',
      });
      setYogaRetreats(yogaRetreats.filter(retreat => retreat.id !== id));
    } catch (error) {
      console.error('Error deleting yoga retreat:', error);
    }
  };

  const handleUpdateYogaRetreat = async () => {
    try {
      await fetch(`http://localhost:9091/yogaretreat/${selectedRetreat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRetreat),
      });
      setYogaRetreats(yogaRetreats.map(retreat => {
        if (retreat.id === selectedRetreat.id) {
          return { ...retreat, ...newRetreat };
        } else {
          return retreat;
        }
      }));
      setShowPopup(false);
      setSelectedRetreat(null);
      setNewRetreat({ retreatName: "", date: "", ancillary_activity: "", meal: "", price: "" }); // Clear form fields
    } catch (error) {
      console.error('Error updating yoga retreat:', error);
    }
  };

  const handleAddYogaRetreat = async () => {
    try {
      const response = await fetch('http://localhost:9091/yogaretreat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRetreat),
      });
      const data = await response.json();
      setYogaRetreats([...yogaRetreats, data]);
      setShowPopup(false);
      setNewRetreat({ retreatName: "", date: "", ancillary_activity: "", meal: "", price: "" });
    } catch (error) {
      console.error('Error adding yoga retreat:', error);
    }
  };

  const openUpdatePopup = (retreat) => {
    setSelectedRetreat(retreat);
    setNewRetreat({ ...retreat }); // Load selected retreat data into the form
    setShowPopup(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Yoga Retreat</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {yogaRetreats.map(retreat => (
            <div key={retreat.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{retreat.retreatName}</h2>
              <p>Date: {retreat.date}</p>
              <p>Activity Type: {retreat.activityType}</p>
              <p>Meal: {retreat.meal}</p>
              <p>Price: {retreat.pricingAmount}</p>
              <div className="text-right mt-2">
                <button onClick={() => handleDeleteYogaRetreat(retreat.id)} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={() => openUpdatePopup(retreat)} className="text-blue-500 hover:text-blue-700">Update</button>
              </div>
            </div>
          ))}
         
          <div className="fixed bottom-8 right-8">
            <button onClick={() => { setShowPopup(true); setSelectedRetreat(null); setNewRetreat({ retreatName: "", date: "", ancillary_activity: "", meal: "", price: "" }); }} className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add 
            </button>
          </div>

        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedRetreat ? "Update" : "Add New"} Yoga Retreat</h2>
            <input type="text" placeholder="Name of the yoga retreat" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.retreatName} onChange={(e) => setNewRetreat({ ...newRetreat, retreatName: e.target.value })} />
            <input type="date" placeholder="Date" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.date} onChange={(e) => setNewRetreat({ ...newRetreat, date: e.target.value })} />
            <textarea placeholder="Activity Type" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.activityType} onChange={(e) => setNewRetreat({ ...newRetreat, activityType: e.target.value })}></textarea>
            <textarea placeholder="Meal" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.meal} onChange={(e) => setNewRetreat({ ...newRetreat, meal: e.target.value })}></textarea>
            <input type="number" placeholder="Price" className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full" value={newRetreat.pricingAmount} onChange={(e) => setNewRetreat({ ...newRetreat, pricingAmount: e.target.value })} />
            <button onClick={selectedRetreat ? handleUpdateYogaRetreat : handleAddYogaRetreat} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">{selectedRetreat ? "Update" : "Add"} Retreat</button>
            <button onClick={() => { setShowPopup(false); setSelectedRetreat(null); setNewRetreat({ retreatName: "", date: "", ancillary_activity: "", meal: "", price: "" }); }} className="bg-gray-300 text-gray-800 ml-2 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

