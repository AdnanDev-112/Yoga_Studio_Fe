'use client'
// 'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateYogaretreatPage = () => {
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        retreatName: '',
        meal: '',
        activityType: '',
        date: '',
        pricing_id: '1',
        yoga_session_id: '1',
        instructor_id: '1',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add to submit the form data, such as sending a request to your backend
        console.log(formData); 
        axios.post('http://localhost:8080/yogaretreat/addyogaretreat', formData)
            .then(response => {
                if (response.status == 200) {
                    alert("Added Successfully");
                    handleBack();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleBack = () => {
        router.push('/Admin/Yogaretreat');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Add a Yoga Retreat</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="retreatName" className="block mb-2 text-sm font-medium text-gray-900">Retreat Name</label>
                    <input
                        type="text"
                        id="retreatName"
                        name="retreatName"
                        value={formData.retreatName}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Retreat Name"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="meal" className="block mb-2 text-sm font-medium text-gray-900">Meal</label>
                    <input
                        type="text"
                        id="meal"
                        name="meal"
                        value={formData.meal}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Meal"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="activityType" className="block mb-2 text-sm font-medium text-gray-900">Activity Type</label>
                    <input
                        type="text"
                        id="activityType"
                        name="activityType"
                        value={formData.activityType}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Activity Type"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </div>
                {/* You can add more fields for pricing_id, yoga_session_id, and instructor_id here */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    );
};

export default CreateYogaretreatPage;
