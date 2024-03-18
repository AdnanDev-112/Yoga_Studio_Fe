'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const CreateSchedulePage = () => {
    const router = useRouter();
    const [schedule, setSchedule] = useState({
        schedule: '',
        courseId: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add to submit the form data, such as sending a request to your backend
        console.log(schedule);
        axios.post('http://localhost:8080/schedule/addschedule', schedule)
            .then(response => {
                if (response.status == 200) {
                    alert("Schedule Added Successfully");
                    handleBack();
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const handleBack = () => {
        router.push('/Admin/Schedule');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Add a Schedule</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="categoryType" className="block mb-2 text-sm font-medium text-gray-900">Type Of Schedule</label>
                    <select id="categoryType" name="categoryType" value={schedule.categoryType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select Type Of Schedule</option>
                        <option value="Course">course</option>
                        <option value="Retreat">retreat</option>
                        <option value="Yoga Retreat">yoga_session</option>
                    </select>
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={schedule.startTime}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Start Time"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={schedule.endTime}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="End Time"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={schedule.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Date"
                        required
                    />
                </div>
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default CreateSchedulePage;