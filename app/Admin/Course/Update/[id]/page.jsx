'use client'
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const CoursePage = () => {
    const router = useRouter();
    
    const [course, setCourse] = useState({
        courseId: '',
            courseName: '',
            startDate: '',
            endDate: '',
            numberOfClasses: '',
            location: '',
            studioId: ''
    });
    const params = useParams();
    
    const [studioData, setStudioData] = useState([]);

    // const fetchInitData = async () => {
    //     try {
    //         const studioResponse = await axios.get('http://localhost:9091/studio/getstudioslist');
    //         setStudioData(studioResponse.data);
    //         setFormData(prevState => ({
    //             ...prevState,
    //             studioId: studioResponse.data[0].id
    //         }));

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    useEffect(() => {
        getData();
    }, []);

    const calculateMaxEndDate = (startDate) => {
        const start = new Date(startDate);
        if (!(start instanceof Date && !isNaN(start))) {
           
            return "";
        }
        const end = new Date(start.getTime() + 56 * 24 * 60 * 60 * 1000); // Add 56 days that is 8 weeks

        return end.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put('http://localhost:9091/course/updatecourse/' + course.id, setCourse)
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
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    function getData() {
        
        axios.get('http://localhost:9091/course/getcoursebyId/' + params.id)
            .then(response => {
                if (response.status == 200) {
                    setCourse(response.data);
                } else {
                    alert("Something Went Wrong");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }


    const handleBack = () => {
        router.push('/Admin/Course');
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Update Course Details</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="studioId" className="block mb-2 text-sm font-medium text-gray-900">Select Location:</label>
                    <select
                        required
                        id="studioId"
                        name="studioId"
                        value={studioData.studioId}
                        onChange={handleChange}
                    >
                        <option value="">Select Location</option>
                        {studioData.map((elem, index) => (
                            <option key={index} value={elem.id}>{elem.location}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                    <input type="date" id="startDate" name="startDate" value={course.startDate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Start Time" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
                    <input type="date" id="endDate" name="endDate" value={course.endDate} onChange={handleChange} min={course.startDate} max={calculateMaxEndDate(course.startDate)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="End Time" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="numberOfClasses" className="block mb-2 text-sm font-medium text-gray-900">Number Of Classes</label>
                    <input type="text" id="numberOfClasses" name="numberOfClasses" value={course.numberOfClasses} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Number Of Classes" required />
                </div>
            
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default CoursePage;
