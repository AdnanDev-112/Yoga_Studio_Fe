'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 


const CreateActivity = () => {
  const [formData, setFormData] = useState({
    activity_type: '',
    level: '',
    max_capacity: '',
    pricing_id: 3,
    duration: '',
    recurring: 0,
    instructor_id: '1',
    manager_id: '1',
    studio_id: '1',
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
    console.log(formData);
    axios
      .post('http://localhost:8080/yoga_session/addYogaSession', formData)
      .then((response) => {
        if (response.status === 200) {
          alert('Added Successfully');
          // handleBack();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <h1>
        {' '}
        <center> Create Session</center>
      </h1>
      <br /> Start with what you want to Create.
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow"
      >
        <div name="Create">
          <label> Session Type: </label>
          <select
            id="sessionType"
            name="activity_type"
            value={formData.activity_type}
            onChange={handleChange}
          >
            <option> --Select Session --</option>
            <option value="Class"> Class</option>
            <option value="Workshop"> Workshop</option>
          </select>
          <label> Level: </label>
          <select
            id=""
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option> --Select Level--</option>
            <option value="Beginner"> Beginner</option>
            <option value="Intermediate"> Intermediate</option>
            <option value="Advance"> Advance</option>
          </select>{' '}
          <br /> <br />
          <label> Client Capacity:</label>
          <input
            type="number"
            title="Enter the maximum clients you want to accommodate"
            name="max_capacity"
            value={formData.max_capacity}
            onChange={handleChange}
          ></input>
          <br /> <br />
          <label> Pricing Rate:</label>
          <input
            type="number"
            title="Rate in Pounds"
            name="pricing_id"
            value={formData.pricing_id}
            onChange={handleChange}
          ></input>
        </div>
        <br />

        <br /> <label> Duration:</label>
        <select id="" name="duration" value={formData.duration} onChange={handleChange}>
          <option value=""> --Select Time in Minutes--</option>
          <option value="60"> 60 </option>
          <option value="75"> 75 </option>
          <option value="90"> 90 </option>
        </select> <br/> <br/>
        <input type="submit" value="Submit"
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        ></input>
      </form>
    </>
  );
};

export default CreateActivity;
