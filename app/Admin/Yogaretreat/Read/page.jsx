'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const YogaretreatPage = () => {
  const router = useRouter();
  const [yogaRetreats, setYogaRetreats] = useState([]);

  useEffect(() => {
    getYogaRetreats();
  }, []);

  const handleBack = () => {
    router.push('/Admin/Yogaretreat');
  };

  function handleDelete(id) {
    confirm("Are you sure you want to delete this yogaretreat?") &&
      axios.delete(`http://localhost:8080/yogaretreat/deleteyogaretreat/${id}`)
        .then(response => {
          if (response.status === 204) {
            getYogaRetreats();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }

  function getYogaRetreats() {
    axios.get('http://localhost:8080/yogaretreat/getyogaretreatlist')
      .then(response => {
        setYogaRetreats(response.data);
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

        <h1 className="text-3xl font-semibold text-gray-900">Yoga Retreats</h1>
        <div className="mt-6 overflow-auto max-h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {yogaRetreats.map((retreat) => (
              <div key={retreat.retreat_id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={`https://source.unsplash.com/800x900/?yogaretreat`} alt={retreat.retreatName} className="w-full h-56 object-cover object-center" />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800">{retreat.retreatName}</h2>
                  <p className="text-sm text-gray-600">Meal: {retreat.meal}</p>
                  <p className="text-sm text-gray-600">Activity Type: {retreat.activityType}</p>
                  <p className="text-sm text-gray-600">Instructor: {retreat.instructorName}</p>
                  <p className="text-sm text-gray-600">Date: {retreat.date}</p>
                  <div className="mt-2">
                    <button onClick={() => { handleDelete(retreat.id) }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                    <Link href={`/Admin/Yogaretreat/Update/${retreat.id}`} passHref>
                      <button className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                        Update
                      </button>
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

export default YogaretreatPage;
