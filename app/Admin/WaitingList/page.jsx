//"use admin";
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function manageWaitingList() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    numberOfClasses: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      id: "",
      name: "",
      startDate: "",
      endDate: "",
      numberOfClasses: "",
      price: "",
    });
  };

  const formStyles = {
    // CSS properties for the form
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'center',
    height: '70vh',
    // background CSS properties
    backgroundImage: 'url(https://www.stockvault.net/data/2017/07/21/237499/preview16.jpg)', // Replace 'path/to/your/image.jpg' with the actual path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '500px', 
  };

  return (
  
    <form style={formStyles} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">Waiting ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name">Course Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startDate"> Date Added: </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="numberOfClasses">Number of Classes:</label>
        <input
          type="number"
          id="numberOfClasses"
          name="numberOfClasses"
          value={formData.numberOfClasses}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="id">Studio ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="id">Pricing ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <button type="submit" style={{ fontWeight: 'bold',
    padding: '5px 5px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',}}>ADD COURSE</button>
    </form>
  );
}
