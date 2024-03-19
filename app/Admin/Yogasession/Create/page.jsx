'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const YogaSessionCreate = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        sessionName: '',
        maxCapacity: '',
        level: 'beginner',
        instructorId: '',
        activityType: 'Aerial',
        price: '',
        duration: '',
        recurring: false,
        studioId: '',
        categoryType: 'Workshop',

    });

    const sessionTypeRecurring = [{ type: "Class", value: true }, { type: "Workshop", value: false }];
    const sessionLevel = ['beginner', 'interim', 'advanced'];
    const activityType = ['Aerial', 'Flowyoga'];

    const [instructorData, setInstructorData] = useState([]);
    const [studioData, setStudioData] = useState([]);


    useEffect(() => {
        fetchInitData();

    }, [])




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name == "recurring") {
            if (value == 1) {
                setFormData(prevState => ({
                    ...prevState,
                    categoryType: 'Class'
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    categoryType: 'Workshop'
                }));
            }
        }


    };

    const fetchInitData = async() => {
        let instructorData = [{id:''}];
        let studioData = [{id:''}];
        await axios.get('http://localhost:9091/instructor/getinstructorslist')
            .then(response => {
                instructorData = response.data;
                setInstructorData(instructorData);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        await axios.get('http://localhost:9091/studio/getstudioslist')
            .then(response => {
                studioData = response.data;
                setStudioData(studioData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setFormData(prevState => ({
                ...prevState,
                instructorId: instructorData[0].id,
                studioId: studioData[0].id
            }));



    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post('http://localhost:9091/yoga_session/addYogaSession', formData)
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
        router.push('/Admin/Instructor');
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Add Yoga Session</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="recurring" className="block mb-2 text-sm font-medium text-gray-900">Session Type</label>
                    <select
                        id="recurring"
                        name="recurring"
                        value={formData.recurring}
                        onChange={handleChange}
                    >
                        {sessionTypeRecurring.map((elem, index) => {
                            return <option key={index} value={elem.value}>{elem.type}</option>
                        })}

                    </select>

                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="instructorId" className="block mb-2 text-sm font-medium text-gray-900">Select Instructor: </label>
                    <select
                        required
                        id="instructorId"
                        name="instructorId"
                        value={formData.instructorId}
                        onChange={handleChange}
                    >
                        <option name="" id="">Select Instructor</option>
                        {instructorData.map((elem, index) => {
                            return <option key={index} value={elem.id}>{elem.instructorName}</option>
                        })}

                    </select>

                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="studioId" className="block mb-2 text-sm font-medium text-gray-900">Select Studio: </label>
                    <select
                        id="studioId"
                        name="studioId"
                        value={formData.studioId}
                        onChange={handleChange}
                    >
                        {studioData.map((elem, index) => {
                            return <option key={index} value={elem.id}>{elem.location}</option>
                        })}

                    </select>

                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-900">Level</label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                    >
                        {sessionLevel.map((elem, index) => {
                            let capitalziedName = elem.charAt(0).toUpperCase() + elem.slice(1);
                            return <option key={index} value={elem} >{capitalziedName}</option>
                        })}

                    </select>

                </div>
                {formData.categoryType == "Class" && <div className="mt-2 mb-6">
                    <label htmlFor="activityType" className="block mb-2 text-sm font-medium text-gray-900">Activity Type</label>
                    <select
                        id="activityType"
                        name="activityType"
                        value={formData.activityType}
                        onChange={handleChange}
                    >
                        {activityType.map((elem, index) => {
                            let capitalziedName = elem.charAt(0).toUpperCase() + elem.slice(1);
                            return <option key={index} value={elem} >{capitalziedName}</option>
                        })}

                    </select>

                </div>}

                <div className="mt-2 mb-6">
                    <label htmlFor="sessionName" className="block mb-2 text-sm font-medium text-gray-900">Session Name</label>
                    <input type="text" id="sessionName" name="sessionName" value={formData.sessionName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Sun Bath" required />
                </div>
                <div className="mt-2 mb-6">
                    <label htmlFor="maxCapacity" className="block mb-2 text-sm font-medium text-gray-900">Max Capacity </label>
                    <input type="number" id="maxCapacity" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>

                <div className="mt-2 mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Pricing </label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                    {formData.categoryType === "Class" && <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={"60"} max={"90"} placeholder="60 Minutes - 90 Minutes" required />}
                    {formData.categoryType === "Workshop" && <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={"2"} max={"4"} placeholder="2 Hours - 4 Hours" required />}
                </div>
                {/* <div className="mb-6">
                    <label htmlFor="telnum" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input type="tel" id="telnum" name="telnum" value={formData.telnum} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-456-7890" required />
                </div> */}
                {/* <div className="mb-6">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="">Select an option</option>
                        {instructorTypes.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                    </select>
                </div> */}

                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default YogaSessionCreate;
