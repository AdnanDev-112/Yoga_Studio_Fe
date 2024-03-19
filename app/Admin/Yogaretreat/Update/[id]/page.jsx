 
'use client'
import { useRouter,useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const YogaretreatUpdate = () => {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        getData();
    }, []);


    const [formData, setFormData] = useState({
      retreatName: '',
      meal: '',
      activityType: '',
      date: '',
      pricing_id: '1',
      yoga_session_id: '1',
      instructor_id: '1',
    });
     
    const [instructorList, setInstructorList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.put('http://localhost:9091/yogaretreat/updateyogaretreat/'+formData.id,formData)
            .then(response => {
              if(response.status == 200){
                alert("Updated Successfully");
                handleBack();
              }
              
            })
            .catch(error => {
              console.error('Error:', error);
            });

    };

    function getData(){
        axios.get('http://localhost:9091/yogaretreat/getyogaretreat/'+ params.id)
            .then(response => {
                if(response.status == 200){
                    setFormData(response.data);
                }else{
                    alert("Something Went Wrong");
                }
            })
            .catch(error => {
              console.error('Error:', error);
            });

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
      
      }

    
    const handleBack = () => {
        router.push('/Admin/Yogaretreat/Read'); 
    };

    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
            <div className="self-start mb-4 cursor-pointer span">
                <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                    ← Back
                </span>
            </div>
                <h1>Update Yogaretreat</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="retreatName" className="block mb-2 text-sm font-medium text-gray-900">Retreat Name</label>
                    <input type="text" id="retreatName" name="retreatName" value={formData.retreatName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Retreat Name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="meal" className="block mb-2 text-sm font-medium text-gray-900">Meal</label>
                    <input type="tel" id="meal" name="meal" value={formData.meal} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Meal" required />
                </div> 
                <div className="mb-6">
                    <label htmlFor="activityType" className="block mb-2 text-sm font-medium text-gray-900"> Activity Type:</label>
                    <select type="activityType" id="activityType" name="activityType" value={formData.activityType} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Activity Type" required >
                        <option value="">Select Type Of Activity</option>
                        <option value="drawing">Drawing</option>
                        <option value="meditation">Meditation</option>
                        <option value="singing">Singing</option>
                    </select>
                </div> 
                <div className="mb-6">
                    <label htmlFor="instructorId" className="block mb-2 text-sm font-medium text-gray-900"> Instructor:</label>
                    <select type="instructorId" id="instructorId" name="instructorId" value={formData.instructorId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Activity Type" required >
                        <option value="">Select Instructor</option>
                        
                        {instructorList.map((instructor) => (
                                <option value={instructor.id}>{instructor.instructorName}</option>
                        ))
                        }
                    </select>
                </div> 
                <div className="mb-6">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" Date" required />
                </div> 
                
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default YogaretreatUpdate;
