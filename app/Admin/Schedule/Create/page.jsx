'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleForm = () => {
    const router = useRouter();
    // const params = useParams();
    //  const clientId = 11;
    const [formData, setFormData] = useState({
        categoryType: '',
        category_type: '',
        selectedSessionId: '',
        yogaSessiontype: '',
        yoga_sessionType: '',
        yogaSessionType: '',
        startTime: '',
        endTime: '',
        date: '',
        numberOfClasses: '0',
        yogasessionId: '',
        retreatId: '',
        courseId: '',
        courseDetails: []
    });

    const [scheduleData, setScheduleData] = useState([]);
    const [originalScheduleData, setOriginalScheduleData] = useState([]);

   
    const bookingFor = ["yoga_session", "retreat", "course"];
    const yogaSessiontypes = ["Class", "Workshop"];

    useEffect(() => {
        if (formData.category_type) {
            fetchScheduleData(formData.category_type);
        }
    }, [formData.category_type]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
    

        if (name.startsWith('classDate') || name.startsWith('classStartTime') || name.startsWith('classEndTime')) {
            const index = parseInt(name.match(/\d+/)[0]);
            const property = name.match(/[a-zA-Z]+/)[0];

            console.log("Index Is :", index);
            console.log("Propertyname", property);

            setFormData(prevState => ({
                ...prevState,
                classes: prevState.classes.map((classItem, i) => i === index ? { ...classItem, [property]: value } : classItem),
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }

        // if (name === "category_type") {
        //     // Clear existing schedule data
        //     setScheduleData([]);
        //     setOriginalScheduleData([]);
        //     // Reset selected session ID
        //     setFormData(prevState => ({
        //         ...prevState,
        //         selectedSessionId: '',
        //     }));
        // }

        if (name === "yoga_sessionType") {
            const updatedData = originalScheduleData.filter((elem) => {
                if (value === "Class" && elem.yogaSession.recurring) {
                    return true;
                } else if (value === "Workshop" && !elem.yogaSession.recurring) {
                    return true;
                }
                return false;
            });
            setScheduleData(updatedData);
        }

        if (name === "selectedSessionId") {
            try {
                scheduleData.map((elem, index) => {
                    if (elem.id == value) {
                        setFormData(prevState => ({
                            ...prevState,
                            // duration: selectedSessionId.duration,
                            // endTime: calculateEndTime(formData.startTime, selectedSession.duration),
                            numberOfClasses: elem.numberOfClasses,
                            selectedSessionId: value,
                            classes: Array.from({ length: elem.numberOfClasses }, (_, index) => ({
                                [`classDate`]: '',
                                [`classStartTime`]: '',
                                [`classEndTime`]: '',
                            })),
                        }));
                    }
                })

            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }

        if (formData.category_type == "course" && name == "selectedSessionId") {
            setFormData(prevState => ({
                ...prevState,
            }));
        }

        if (name === "yoga_sessionType" && value.length === 0) {
            setScheduleData(originalScheduleData);
        }

        if (name === "course") {
            setScheduleData(originalScheduleData);
        }

        console.log(name, value);
    };

    const fetchScheduleData = (categoryType) => {
        axios.get(`http://localhost:9091/schedule/getcategorizedschedule?categoryType=${categoryType}`)
            .then(response => {
                setScheduleData(response.data || []);
                setOriginalScheduleData(response.data || []);
                console.log(response.data, "Responsedaataa");
                console.log(formData);
                console.log(scheduleData)

            })
            .catch(error => {
                console.error('Error fetching schedule:', error);
            });
    };

    const calculateEndTime = (startTime, duration) => {
        // Convert the start time to minutes
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startTimeInMinutes = startHours * 60 + startMinutes;
    
        // Add duration to start time in minutes
        const endTimeInMinutes = startTimeInMinutes + parseInt(duration);
    
        // Convert back to hours and minutes
        const endHours = Math.floor(endTimeInMinutes / 60);
        const endMinutes = endTimeInMinutes % 60;
    
        // Format the end time as "HH:mm"
        const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
        return endTime;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);


        if (!formData.selectedSessionId) {
            console.error('Selected session ID is null.');
            return; // Do not proceed with form submission
        }

        const dataToSubmit = {
            selectedSessionId: formData.selectedSessionId,
            categoryType: formData.category_type,
            startTime: formData.startTime,
            endTime: formData.endTime,
            date: formData.date,
            courseId: formData.courseId ,
            classes: formData.classes
        }

        axios.post("http://localhost:9091/schedule/addschedule", dataToSubmit)
            .then(response => {
                console.log(response.data);
                setScheduleData(response.data || []);
                setOriginalScheduleData(response.data || []);
                alert('Schedule added Successfully!');
                router.push('/Admin/Schedule');
            })
            .catch(error => {
                console.error('Error adding a schedule:', error);
            });
       
    };


    const handleBack = () => {
        router.push('/Admin/Schedule');
    };

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-7xl bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Schedule</h1>
                <div className="mb-6">
                    <label htmlFor="category_type" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <select id="category_type" name="category_type" value={formData.category_type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize" required>
                        <option value="">Select an option</option>
                        {bookingFor.map((elem, index) => (
                            <option key={index} value={elem}>{elem}</option>
                        ))}
                    </select>
                </div>
                {formData.category_type === "yoga_session" && (
                    <div className="mb-6">
                        <label htmlFor="yogaSessionType" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                        <select id="yogaSessionType" name="yogaSessionType" value={formData.yogaSessionType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize" required>
                            <option value="">Select an option</option>
                            {yogaSessiontypes.map((elem, index) => (
                                <option key={index} value={elem}>{elem}</option>
                            ))}
                        </select>
                    </div>
                )}
                {scheduleData.length > 0 && (
                    <div className="mb-6 overflow-auto max-h-40">
                        {scheduleData.map((category_Item) => (
                            <div key={category_Item.id}>
                                <input type="radio" id={category_Item.id} name="selectedSessionId" value={category_Item.id} onChange={handleChange} />
                                {formData.category_type == "yoga_session" && <label htmlFor={category_Item.id} className="ml-2">Yoga Type :-[{category_Item.activityType}] | Level:- {category_Item.level} | Capacity: {category_Item.maxCapacity} | Duration in minutes: {category_Item.duration} | Session Name: {category_Item.sessionName} </label>}
                                {formData.category_type == "retreat" && <label htmlFor={category_Item.id} className="ml-2">Retreat Name :-[{category_Item.retreatName}] | <span className='capitalize'>{category_Item.retreatName}</span> | Activity: <span className='capitalize'>{category_Item.activityType}</span></label>}
                                {formData.category_type == "course" && <label htmlFor={category_Item.id} className="ml-2">Course Name :-[{category_Item.courseName}] | <span className='capitalize'>{category_Item.courseName}</span> | Number Of Classes: <span >{category_Item.numberOfClasses}</span> | Start Date: <span >{category_Item.startDate}</span> | End Date: <span >{category_Item.endDate}</span> | Location: <span >{category_Item.studio && category_Item.studio.location}</span></label>}
                            </div>
                        ))}
                    </div>
                )} {formData.yogaSessionType === "Class" || formData.yogaSessionType === "Workshop" ? (
                    <div className="mb-6">
                        <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                ) : null}
                {formData.yogaSessionType === "Class" || formData.yogaSessionType === "Workshop" ? (
                    <div className="mb-6">
                        <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                ) : null}
                {formData.yogaSessionType === "Class" || formData.yogaSessionType === "Workshop" ? (
                    <div className="mb-6">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                ) : null}


                {formData.category_type === "retreat" && (
                    <div className="mb-6">
                        <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900">Start Time</label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                )}
                {formData.category_type === "retreat" && (
                    <div className="mb-6">
                        <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900">End Time</label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                )}
                {formData.category_type === "retreat" && (
                    <div className="mb-6">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                )}


                {formData.category_type === "course" && (
                    <>
                        <div className="mb-6">
                            <label htmlFor="numberOfClasses" className="block mb-2 text-sm font-medium text-gray-900">Number of Classes</label>
                            <input disabled type="number" id="numberOfClasses" name="numberOfClasses" value={formData.numberOfClasses} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        {Array.from({ length: parseInt(formData.numberOfClasses) }, (_, index) => (
                            <div key={index} className="mb-6">
                                <label htmlFor={`classDate${index}`} className="block mb-2 text-sm font-medium text-gray-900">Class {index + 1} Date</label>
                                <input type="date" id={`classDate${index}`} name={`classDate${index}`} value={formData[`classDate${index}`]} onChange={handleChange} min={formData.startDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                <label htmlFor={`classStartTime${index}`} className="block mb-2 text-sm font-medium text-gray-900">Class {index} Start Time</label>
                                <input type="time" id={`classStartTime${index}`} name={`classStartTime${index}`} value={formData[`classStartTime${index}`]} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                <label htmlFor={`classEndTime${index}`} className="block mb-2 text-sm font-medium text-gray-900">Class {index} End Time</label>
                                <input type="time" id={`classEndTime${index}`} name={`classEndTime${index}`} value={formData[`classEndTime${index}`]} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                        ))}
                    </>
                )}



                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Schedule</button>
            </form>
        </div>
    );
};

export default ScheduleForm;