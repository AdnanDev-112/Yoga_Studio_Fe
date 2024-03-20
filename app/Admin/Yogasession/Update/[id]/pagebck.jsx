'use client'
import { useRouter,useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const SessionUpdate = () => {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        getData();
    }, []);


    const [formData, setFormData] = useState({
        activityType: '',
        level: '',
        max_capacity: '',
        pricing_id: 3,
        duration: '',
        recurring: 0,
        instructor_id: '1',
        manager_id: '1',
        studio_id: '1',
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
        console.log(formData);
        axios.put('http://localhost:9091/yoga_session/updatesession/'+formData.id,formData)
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
        axios.get('http://localhost:9091/yoga_session/getoneyogasession/'+ params.id)
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
      
      }

    
    const handleBack = () => {
        router.push('/Admin/Activities'); 
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
                <label> Session Type: </label>
          <select
            id="sessionType"
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
          >
            <option> --Select Session --</option>
            <option value="Class"> Class</option>
            <option value="Workshop"> Workshop</option>
          </select></div>
                <div className="mb-6">
                    <label htmlFor="telnum" className="block mb-2 text-sm font-medium text-gray-900">Level</label>
                    <select
            id=""
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option> --Select Level--</option>
            <option value="beginner"> Beginner</option>
            <option value="interim"> Intermediate</option>
            <option value="advanced"> Advance</option>
          </select></div> 
          <label> Duration:</label>
        <select id="" name="duration" value={formData.duration} onChange={handleChange}>
          <option value=""> --Select Time in Minutes--</option>
          <option value="60"> 60 </option>
          <option value="75"> 75 </option>
          <option value="90"> 90 </option>
        </select> <br/> <br/>
   
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default SessionUpdate;
 <br/>