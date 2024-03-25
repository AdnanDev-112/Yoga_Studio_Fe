'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const SessionManagementRead = () => {
  const router = useRouter();
  const [YogaSession, setYogaSession] = useState([]);


  useEffect(() => {
    getData();
  }, [])


  const handleBack = () => {
    router.push('/Admin/Yogasession');
  };

    function updateImgUrls(data) {
      const keywords = ['yoga', 'meditation', 'asana', 'yogaclass', 'yogapose', 'yogamat', 'yogastudio', 'yogateacher', 'yogapractice'];

      return data.map((elem, index) => {
        const keyword = keywords[index % keywords.length];
        return {
          ...elem,
          imageUrl: `https://source.unsplash.com/800x900/?${keyword}`
        }
      })
    };

  function handleDelete(id) {
    confirm("Are you sure you want to delete this Session?") && axios.delete('http://localhost:9091/yoga_session/deletesession/' + id)
      .then(response => {
        if (response.status == 204) {
          getData();
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  function getData() {
    axios.get('http://localhost:9091/yoga_session/getYogaSessions')
      .then(response => {
        console.log(response.data);
        const updatedUrlData = response.data.length > 0 ? updateImgUrls(response.data) : [];
        setYogaSession(updatedUrlData);
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

        <h1 className="text-3xl font-semibold text-gray-900">Sessions</h1>
        <div className="mt-6 overflow-auto max-h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {YogaSession.map((yogasession) => (
              <div key={yogasession.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={yogasession.imageUrl} alt={yogasession.sessionName} className="w-full h-56 object-cover object-center" />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800">{yogasession.sessionName}</h2>
                  <p className="text-sm text-gray-600">Activity Type : {yogasession.activityType}</p>
                  <p className="text-sm text-gray-600 capitalize">Level: {yogasession.level}</p>
                  {/* <p className="mt-3 text-gray-600">{instructor.bio}</p> */}
                  <div className="mt-2">
                    <button onClick={() => { handleDelete(yogasession.id) }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                    <Link className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                      href={"/Admin/Yogasession/Update/" + yogasession.id}>
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

export default SessionManagementRead;
