'use client'
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const SchedulePage = () => {
    const router = useRouter();
    const [schedule, setSchedule] = useState([]);
    const params = useParams();
    const [selectedOption, setSelectedOption] = useState(false); // Initialize with default value


    useEffect(() => {
        getData();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put('http://localhost:8080/client/updateclient/' + formData.id, formData)
            .then(response => {
                if (response.status == 200) {
                    alert("Updated Successfully");
                    handleBack();
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedOption(value);
        setSchedule(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    function getData() {
        axios.get('http://localhost:8080/client/getclient/' + params.id)
            .then(response => {
                if (response.status == 200) {
                    setFormData(response.data);
                } else {
                    alert("Something Went Wrong");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }


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
                <h1>Update Session Information</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="sessionType" className="block mb-2 text-sm font-medium text-gray-900">Type Of Session</label>
                    <select id="sessionType" name="sessionType" value={schedule.categoryType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select Type Of Session</option>
                        <option value="Option 1">Course</option>
                        <option value="Option 2">Workshop</option>
                        <option value="Option 3">Class</option>
                    </select>
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">Type Of Level</label>
                    <select id="level" name="level" value={schedule.level} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select Type Of Level</option>
                        <option value="Option 1">Interim</option>
                        <option value="Option 2">Beginner</option>
                        <option value="Option 3">Advanced</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Class Capacity</label>
                    <input type="capacity" id="capacity" name="capacity" value={schedule.maxCapacity} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Capacity" required />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <select id="level" name="level" value={schedule.amount} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select Price for Sessions</option>
                        <option value="Option 1">£30</option>
                        <option value="Option 2">£40</option>
                        <option value="Option 3">£50</option>
                        <option value="Option 3">£60</option>
                        <option value="Option 3">£70</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="Duration" className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                    <input type="Duration" id="Duration" name="Duration" value={schedule.duration} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Duration" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="recurring" className="block mb-2 text-sm font-medium text-gray-900">Recurring</label>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${!selectedOption ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                            onClick={() => handleChange(true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${selectedOption ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                            onClick={() => handleChange(false)}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Instructor Name</label>
                    <input type="name" id="name" name="name" value={schedule.instructorName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Instructor Name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Manager</label>
                    <input type="name" id="name" name="name" value={schedule.managerName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Manager Name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Studio</label>
                    <input type="address" id="address" name="address" value={schedule.address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Studio Address" required />
                </div>
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default SchedulePage;
