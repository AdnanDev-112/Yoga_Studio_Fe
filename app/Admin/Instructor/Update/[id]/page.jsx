'use client'
import { useRouter,useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';


const InstrctorUpdate = () => {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        getData();
    }, []);


    const [formData, setFormData] = useState({
        instructorName: '',
        telnum: '',
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
        axios.put('http://localhost:9091/instructor/updateinstructor/'+formData.id,formData)
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
        axios.get('http://localhost:9091/instructor/getoneinstructor/'+ params.id)
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
                <h1>Update Instructor</h1>
                <div className="mt-2 mb-6">
                    <label htmlFor="instructorName" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input type="text" id="instructorName" name="instructorName" value={formData.instructorName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="telnum" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input type="tel" id="telnum" name="telnum" value={formData.telnum} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-456-7890" required />
                </div> 
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default InstrctorUpdate;
