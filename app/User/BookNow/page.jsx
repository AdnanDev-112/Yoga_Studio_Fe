'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookNow = () => {
    const router = useRouter();
    const clientId = 11;
    const [formData, setFormData] = useState({
        category_type: '',
        yogaSessiontype: '',
        selectedSessionId: '',
        yoga_sessionType: ''
    });



    const [scheduleData, setScheduleData] = useState([]);
    const [originalScheduleData, setOriginalScheduleData] = useState([]);


    const bookingFor = ["yoga_session", "retreat", "course"];
    const yogaSessiontypes = ["Class", "Workshop"];

    useEffect(() => {
        if (formData.category_type) {
            fetchscheduleData(formData.category_type);
        }
    }, [formData.category_type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

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

        if (name == "yoga_sessionType" && value.length == 0) {
            setScheduleData(originalScheduleData);
        }

        console.log(name, value);
    };

    const fetchscheduleData = (categoryType) => {

        axios.get("http://localhost:9091/schedule/getschedulebycategory?categoryType=" + categoryType + "&&clientID=" + clientId)
            .then(response => {
                console.log(response.data);
                setScheduleData(response.data || []);
                setOriginalScheduleData(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });
    };
    const submitData = () => {
        const dataToSubmit = {
            clientId: clientId,
            scheduleId: formData.selectedSessionId,
            category_type: formData.category_type,
        };

        axios.post("http://localhost:9091/booking/addbooking", dataToSubmit)
            .then(response => {
                console.log(response.data);
                setScheduleData(response.data || []);
                setOriginalScheduleData(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        submitData();

        alert('Booking Done Successfully!');
        router.push('/User/dashboard');

    };

    const handleBack = () => {
        router.push('/User/dashboard');
    };

    const getPricingElements = () => {
        let selectedCategory = "";

        switch (formData.category_type) {
            case "yoga_session":
                selectedCategory = "yogaSession";
                break;
            case "retreat":
                selectedCategory = "retreat";
                break;
            case "course":
                selectedCategory = "course";
                break;

            default:
                break;
        }
        let selectedSession = scheduleData.find(session => session.id == formData.selectedSessionId);

        let price = selectedSession && selectedSession[selectedCategory] ? selectedSession[selectedCategory].pricing.amount : 'Nill';

        if (formData.category_type != "course") {
            return (
                <div className="my-4">
                    <span>Price : {price}</span>
                </div>
            );
        } else {
            return (
                <div className="my-4">
                    <p > Original Price : <span className='line-through'>{price}</span></p>

                    <p>Discounted Price :- <span className='bold'>{selectedSession[selectedCategory].pricing.discountAppliedPrice}</span></p>
                </div>
            );
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-7xl bg-white p-8 rounded-lg shadow">
                <div className="self-start mb-4 cursor-pointer span">
                    <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                        ← Back
                    </span>
                </div>
                <h1>Book Now</h1>

                <div className="mb-6">
                    <label htmlFor="category_type" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <select id="category_type" name="category_type" value={formData.category_type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize" required>
                        <option value="">Select an option</option>
                        {bookingFor.map((elem, index) => (
                            <option key={index} value={elem}>{elem}</option>
                        ))}
                    </select>
                </div>
                {formData.category_type == "yoga_session" && <div className="mb-6">
                    <label htmlFor="yoga_sessionType" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                    <select id="yoga_sessionType" name="yoga_sessionType" value={formData.yoga_sessionType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize" required>
                        <option value="">Select an option</option>
                        {yogaSessiontypes.map((elem, index) => (
                            <option key={index} value={elem}>{elem}</option>
                        ))}
                    </select>
                </div>}
                {scheduleData.length > 0 && (
                    <div className="mb-6 overflow-auto max-h-40">
                        {scheduleData.map((category_Item) => (
                            <div key={category_Item.id}>
                                <input type="radio" id={category_Item.id} name="selectedSessionId" value={category_Item.id} onChange={handleChange} />
                                {category_Item.categoryType == "yoga_session" && <label htmlFor={category_Item.id} className="ml-2">Date :-[{category_Item.date}] | Timing:- {category_Item.startTime} - {category_Item.endTime} | Type: {category_Item.yogaSession.activityType} | Level: {category_Item.yogaSession.level}</label>}
                                {category_Item.categoryType == "retreat" && <label htmlFor={category_Item.id} className="ml-2">Date :-[{category_Item.date}] | Timing:- {category_Item.startTime} - {category_Item.endTime} | <span className='capitalize'>{category_Item.retreat.retreatName}</span> | Actiivity: <span className='capitalize'>{category_Item.retreat.activityType}</span>  | Meal: {category_Item.retreat.meal}</label>}
                                {category_Item.categoryType == "course" && <label htmlFor={category_Item.id} className="ml-2">Date :-[{category_Item.date}] | Timing:- {category_Item.startTime} - {category_Item.endTime} | <span className='capitalize'>{category_Item.course.courseName}</span> | Number Of Classes: <span >{category_Item.course.numberOfClasses}</span></label>}
                            </div>
                        ))}
                    </div>
                )}

                {scheduleData.length > 0 && formData.selectedSessionId != '' && formData.category_type != "" && getPricingElements()}

                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Book</button>
            </form>
        </div>
    );
};

export default BookNow;
