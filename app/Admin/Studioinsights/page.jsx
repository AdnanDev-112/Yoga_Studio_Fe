'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Studio_Insights = () => {
  const [formData, setFormData] = useState({
    studioId: ''
  });

  const [studioData, setStudioData] = useState([]);
  
  const [selectedStudioObjects, setSelectedStudioObjects] = useState({
    totalClasses: 0,
    waitingList: 0,
    totalBookings: 0,
    revenue: 0
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (formData.studioId) {
      fetchObjectsByStudioId(formData.studioId);
    }
  }, [formData.studioId]);


  const fetchInitData = async () => {
    try {
      const studioResponse = await axios.get('http://localhost:9091/studio/getstudioslist');
      setStudioData(studioResponse.data);
      console.log(studioResponse.data);
      if (studioResponse.data.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          studioId: studioResponse.data[0].id
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchObjectsByStudioId = async (studioId) => {
    try {
      const response = await axios.get(`http://localhost:9091/studio/getstudiodinsights/${studioId}`);
      setSelectedStudioObjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching objects:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Studio Insights</h2>
      <div className="mt-8">
        <label htmlFor="studioId" className="block text-lg font-semibold mb-2">Select Studio:</label>
        <select
          id="studioId"
          name="studioId"
          value={formData.studioId}
          onChange={handleChange}
          className="w-full max-w-xs bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
        >
          {studioData.map(studio => (
            <option key={studio.id} value={studio.id}>{studio.location}</option>
          ))}
        </select>
      </div><br></br><br></br>
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Classes</h3>
            <p className="text-xl font-bold">{selectedStudioObjects.totalClasses}</p>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Waiting List</h3>
            <p className="text-xl font-bold">{selectedStudioObjects.waitingList}</p>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
            <p className="text-xl font-bold">{selectedStudioObjects.totalBookings}</p>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-xl font-bold">${selectedStudioObjects.revenue}</p>
          </div>
        </div>
      </div>
      {/* Add more insights here */}
    </div>
  );
};

export default Studio_Insights;
