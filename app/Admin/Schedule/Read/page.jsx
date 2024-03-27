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
        confirm("Are you sure you want to delete this session?") && axios.delete('http://localhost:9091/schedule/deleteschedule/' + id)
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
        axios.get('http://localhost:9091/schedule/getschedulelistdesc')
            .then(response => {
                console.log(response.data);
                setSchedule(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function verifyYogaSessiontype(item) {
        return item.yogaSession.recurring ? "Class" : "Workshop";
    }

    return (
        <div className="schedule-list">
            <div className="self-start mb-4 cursor-pointer span">
                <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
                    ← Back
                </span>
            </div>
            <h1 className='text-center text-4xl text-gray-900 font-extralight dark:text-black'>Studio Sessions List</h1>
            <br></br><br></br>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3">
                                Type Of Session
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Session Name
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Start Time
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                End Time
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {schedule && schedule.map((schedule, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {schedule.categoryType == "yoga_session" ? verifyYogaSessiontype(schedule) : schedule.categoryType || 'Not Assigned'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.yogaSession ? schedule.yogaSession.sessionName : (schedule.retreat ? schedule.retreat.retreatName : (schedule.course ? schedule.course.courseName : ''))}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.date || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.startTime || 'NA'}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {schedule.endTime || 'NA'}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Link href={"/Admin/Schedule/Update/" + index} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Update
                                    </Link>
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
