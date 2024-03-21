'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateYogaretreatPage = () => {
    const router = useRouter();
    useEffect(() => {
        getData();
    }, []);
// 
    // Table data 

    // 2	retreat_name
    // 3	meal
    // 4	activity_type
    // 5	pricing_id  
    // 6	yoga_session_id 
    // 7	instructor_id
    

    // @Column(name = "retreat_name", nullable = false, length = 150)
    // private String retreatName;

    // @Column(name = "meal", nullable = false, length = 150)
    // private String meal;

    // @Lob
    // @Column(name = "activity_type", nullable = false)
    // private String activityType;

    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    // @JoinColumn(name = "pricing_id", nullable = false)
    // private Pricing pricing;


    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    // @JoinColumn(name = "yoga_session_id", nullable = false)
    // private YogaSession yogaSession;


    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    // @JoinColumn(name = "instructor_id", nullable = false)
    // private Instructor instructor;

    // // Additional fields for JSON representation
    // @Transient
    // private Integer instructorId;

    // @Transient
    // private BigDecimal price;

    const [formData, setFormData] = useState({
        retreatName: '',
        meal: '',
        activityType: '',
        instructorId: '',
        workshopId: '1',
        price: ''
    });
    const [instructorList, setInstructorList] = useState([]);
    const [WorkshopsList, setWorkshopsList] = useState([]);
    const activityTypes = ["drawing","meditation","singing"];

    function getData(){
        
            axios.get('http://localhost:9091/instructor/getinstructorslist')
            .then(response => {
                if(response.status == 200){
                    setInstructorList(response.data);
                }else{
                    alert("Something Went Wrong");
                }
            })
            .catch(error => {
              console.error('Error:', error);
            });
            axios.get('http://localhost:9091/yoga_session/getsessionsbyworkshop')
            .then(response => {
                if(response.status == 200){
                    setWorkshopsList(response.data);
                }else{
                    alert("Something Went Wrong");
                }
            })
            .catch(error => {
              console.error('Error:', error);
            });
      
      }
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
        axios.post('http://localhost:9091/yogaretreat/addyogaretreat', formData)
            .then(response => {
                if (response.status == 200) {
                    alert("Added Successfully");
                    router.push('/Admin/Yogaretreat/Read');
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
                    <select
                        type="text"
                        id="activityType"
                        name="activityType"
                        value={formData.activityType}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Activity Type"
                        required
                    >
                        <option value="">Select Type Of Activity</option>
                        {activityTypes.map((elem,index)=>{
                            let capitalziedName = elem.charAt(0).toUpperCase() + elem.slice(1);
                            return <option key={index} value={elem}>{capitalziedName}</option>

                        })}
                        
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="instructorId" className="block mb-2 text-sm font-medium text-gray-900"> Instructor:</label>
                    <select type="instructorId" id="instructorId" name="instructorId" value={formData.instructorId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Activity Type" required >
                        <option value="">Select Instructor</option>
                        
                        {instructorList.map((instructor,index) => (
                                <option key={index} value={instructor.id}>{instructor.instructorName}</option>
                        ))
                        }
                    </select>
                </div> 
                <div className="mb-6">
                    <label htmlFor="workshopId" className="block mb-2 text-sm font-medium text-gray-900"> Select the Encompassing Workshop:</label>
                    <select type="workshopId" id="workshopId" name="workshopId" value={formData.workshopId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Activity Type" required >
                        <option value="">Select Workshop</option>
                        
                        {WorkshopsList.map((workshop,index) => (
                                <option key={index} value={workshop.id}>{workshop.sessionName}</option>
                        ))
                        }
                    </select>
                </div> 
                <div className="mt-2 mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Pricing </label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>
                {/* <div className="mt-2 mb-6">
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
                </div> */}
                {/* You can add more fields for pricing_id, yoga_session_id, and instructor_id here */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    );
};

export default CreateYogaretreatPage;
