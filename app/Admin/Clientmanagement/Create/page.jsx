'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const CreateClientPage = () => {
    const router = useRouter();
    

    const [formData, setFormData] = useState({
        clientName: '',
        email: '',
        address: '',
        telnum: '',
        dob: '',
        studioId: '1', // Assuming this is where you store the selected studio address
        clientDiscountStatus: false
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
        axios.post('http://localhost:8080/client/addclient', formData)
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
        router.push('/Admin/Clientmanagement');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Add a Client</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">Email ID:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Address"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="clientName" className="block mb-2 text-sm font-medium text-gray-900">Telephone Number</label>
                    <input
                        type="tel"
                        id="telnum"
                        name="telnum"
                        value={formData.telnum}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900">Date-Of-Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    );
};

export default CreateClientPage;