'use client'
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const SchedulePage = () => {
    const router = useRouter();
    
    const [schedule, setSchedule] = useState({
        scheduleId: '',
            category_type: '',
            startTime: '',
            endTime: '',
            date: '',
            sessionName: ''
    });
    const params = useParams();
    
    useEffect(() => {
        getData();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put('http://localhost:9091/schedule/updateschedule/' + schedule.id, setSchedule)
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
        axios.get('http://localhost:9091/schedule/getschedule/' + params.id)
            .then(response => {
                if (response.status == 200) {
                    setSchedule(response.data);
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
                <h1>Update Schedule Information</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="sessionType" className="block mb-2 text-sm font-medium text-gray-900">Type Of Category</label>
                    <select id="sessionType" name="sessionType" value={schedule.categoryType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select Type Of Category</option>
                        <option value="Option 1">Course</option>
                        <option value="Option 2">Yoga_session</option>
                        <option value="Option 3">Retreat</option>
                    </select>
                </div>
            
                <div className="mb-6">
                    <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                    <input type="time" id="startTime" name="startTime" value={schedule.startTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Start Time" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                    <input type="time" id="endTime" name="endTime" value={schedule.endTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="End Time" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                    <input type="date" id="date" name="date" value={schedule.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Capacity" required />
                </div>
            
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default SchedulePage;
