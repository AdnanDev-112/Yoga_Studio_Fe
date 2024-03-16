'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 

const InstructorsPage = () => {
  const router = useRouter();
  const [Instructor, setInstructor] = useState([]);

  
  useEffect(() => {
    getData();
  }, [])
  
  
  const handleBack = () => {
    router.back(); 
};

function updateImgUrls(data){
  return data.map((elem,index)=>{
    return {
      ...elem,
      imageUrl:"https://source.unsplash.com/800x900/?yogateacher"
    }
  })

};

function handleDelete(id){
  confirm("Are you sure you want to delete this instructor?") && axios.delete('http://localhost:9091/instructor/deleteinstructor/'+id)
      .then(response => {
        if(response.status == 204){
          getData();
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
}
function getData(){
  axios.get('http://localhost:9091/instructor/getinstructorslist')
      .then(response => {
        const updatedUrlData = response.data.length > 0 ? updateImgUrls(response.data): [];
        setInstructor(updatedUrlData);
      })
      .catch(error => {
        console.error('Error:', error);
      });

}
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="self-start mb-4 cursor-pointer span">
                <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                    ← Back
                </span>
            </div>
        
        <h1 className="text-3xl font-semibold text-gray-900">Our Instructors</h1>
        <div className="mt-6 overflow-auto max-h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Instructor.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={instructor.imageUrl} alt={instructor.instructorName} className="w-full h-56 object-cover object-center" />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800">{instructor.instructorName}</h2>
                  <p className="text-sm text-gray-600">Contact Info: {instructor.telnum}</p>
                  {/* <p className="mt-3 text-gray-600">{instructor.bio}</p> */}
                  <div className="mt-2">
                    <button onClick={()=>{handleDelete(instructor.id)}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                      <Link className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                       href={"/Admin/Instructor/Update/"+instructor.id}>
                        Update
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;