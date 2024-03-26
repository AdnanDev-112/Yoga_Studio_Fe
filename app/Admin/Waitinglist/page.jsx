"use client";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

import WaitingListAccordian from '../../../components/WaitingListAccordian';



const WaitinglistManagement = () => {
    const params = useParams();
    const router = useRouter();
    // const [waitingListData, setWaitingListData] = useState(Array.from({ length: 10 }));
    const [waitingListData, setWaitingListData] = useState([]);


    useEffect(() => {
        getData(); // Pass the id value to the getData function
    }, []);


    const handleBack = () => {
        router.push('/Admin/dashboard');
    };


    function getData() {
        axios.get('http://localhost:9091/waitinglist/getwaitinglist')
            .then(response => {
                console.log(response.data);
                // const duplicatedWaitingListData = duplicateArray(response.data, 3);
                setWaitingListData(response.data);
            })
            .catch(error => {
                console.error('Error fetching waitingListData data:', error);
                // setWaitingListData([]);
            });

    }
    function duplicateArray(array, times) {
        let result = [];
        for (let i = 0; i < times; i++) {
            result = result.concat(array);
        }
        return result;
    }

    const duplicatedWaitingListData = duplicateArray(waitingListData, 3);


    console.log(waitingListData);


    return (
        <div className="">
            <div className="self-start mb-4 cursor-pointer span">
                <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                    ← Back
                </span>
            </div>
            <h1 className='text-center text-4xl text-gray-900 font-extralight '>Waiting List</h1>
            <br></br><br></br>


            <div className="relative   border-black border border-b-0 p-2">

                <div className="grid grid-cols-1 gap-4">
                    {waitingListData.length > 0 && waitingListData.map((data, index) => {
                        const date = new Date(data.items.length > 0 ? data.items[0].booking.schedule.date : "");
                        const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                        const maxCapacity = data.items[0].yogaSession.maxCapacity;
                        const currentCapacity = data.currentCapacity;

                        return (
                        
                                <div key={index} className="border-2 border-black border-t-0 border-x-0 rounded-lg p-4 shadow-md">
                                    <h2 className="text-center text-xl text-gray-900 font-light">{data.className} - {formattedDate} | Max Capacity: {maxCapacity} | Current Capacity: {currentCapacity}</h2>
                                    <WaitingListAccordian title={""} items={data.items} />
                                </div>
                            
                        )
                    }

                    )}
                    {waitingListData.length === 0 && (
                        <div className="text-center text-xl text-gray-900 font-light">No Data Found</div>
                    )}
                </div>


            </div>



        </div>
    );
};


export default WaitinglistManagement;