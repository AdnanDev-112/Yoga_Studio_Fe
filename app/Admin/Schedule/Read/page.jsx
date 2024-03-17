'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SchedulePage = () => {
    const router = useRouter();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleBack = () => {
        router.back();
    };

    function handleDelete(id) {
        confirm("Are you sure you want to delete this session?") && axios.delete('http://localhost:8080/schedule/deleteschedule/' + id)
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
        axios.get('http://localhost:8080/schedule/getschedulelist')
            .then(response => {
                console.log(response.data);
                setSchedule(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="booking-list">
            <div className="self-start mb-4 cursor-pointer span">
                <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                    ← Back
                </span>
            </div>
            <h1 className='text-center text-4xl text-gray-900 font-extralight dark:text-white'>Studio Sessions List</h1>
            <br></br><br></br>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3">
                                Type Of Session
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Level Type
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Class Max Capacity
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Duration
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Recurring
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Instructor
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Manager
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Studio
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule && schedule.map((schedule, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {schedule.categoryType || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.level || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.maxCapacity || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    £{schedule.amount || '0'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.duration || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.recurring || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.instructorName || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.managerName || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.address || 'NA'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={"/Admin/Schedule/Update/" + index} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Update
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => { handleDelete(index) }} className="font-medium text-red-600 dark:text-blue-500 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchedulePage;
