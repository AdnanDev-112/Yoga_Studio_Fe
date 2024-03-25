'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



// getschedulelistdesc
const ViewSchedule = () => {
    const [scheduleList, setScheduleList] = useState([])
    const router = useRouter(); 


    useEffect(() => {
        getData();
    }, [])

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
        axios.get('http://localhost:9091/schedule/getschedulelistdesc')
            .then(response => {
                console.log(response.data);
                setScheduleList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const handleBack = () => {
        router.push('/User/dashboard');
    };



    // Helpers 

    function calculateDiscountedPrice(originalPrice, discountValue) {
        const discountAmount = originalPrice * (discountValue / 100);
        const discountedPrice = originalPrice - discountAmount;
        return discountedPrice;
    }
    function displayPricing(schedule) {
        const categoryType = schedule.categoryType;
        if (categoryType == 'course') {
            console.log("here" , schedule);
            return schedule.course.pricing.amount;

        } else if (categoryType == 'yoga_session') {
            return schedule.yogaSession.pricing.amount

        } else {
            return schedule.retreat.pricing.amount
        }


    }

    function objectKeyMapper(obj) {
        let categoryType = obj.categoryType;
        if (categoryType == 'yoga_session') {
            categoryType = 'yogaSession';
        }
        return obj[categoryType];
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
            <h1 className='text-center text-4xl text-gray-900 font-extralight :text-white'>Schedule List</h1>
            <br /><br />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
                        <tr>
                            <th scope="col" className=" text-center px-6 py-3">
                                Type Of Session
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Session Name
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Instructor
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Studio Location
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleList.length > 0 && scheduleList.map((item, index) => {
                            const schedule = item;
                            const itemData = objectKeyMapper(schedule);

                            return (
                                <tr key={index} className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
                                    <td className=" capitalize text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                                        {schedule.categoryType == "yoga_session" ? verifyYogaSessiontype(schedule) : schedule.categoryType || 'Not Assigned'}
                                    </td>
                                    <td className="text-center px-6 py-4">
                                        {schedule.yogaSession ? schedule.yogaSession.sessionName : (schedule.retreat ? schedule.retreat.retreatName : (schedule.course ? schedule.course.courseName : ''))}
                                    </td>
                                    <td className="text-center px-6 py-4">
                                        £{displayPricing(schedule) || '0'}
                                    </td>
                                    <td className="text-center px-6 py-4">
                                        {schedule.date || 'Not Assigned'}
                                    </td>
                                    <td className="text-center px-6 py-4">
                                        {schedule.categoryType != "course" && itemData.instructor ? itemData.instructor.instructorName || 'Not Assigned' : " "}
                                        {schedule.categoryType == "course" && itemData.yogaSession.instructor.instructorName}
                                    </td>
                                    <td className="text-center px-6 py-4">
                                    {schedule.categoryType == "yoga_session" && itemData.studio ? itemData.studio.location || 'Not Assigned' : " "}
                                    {schedule.categoryType == "course" && itemData.yogaSession.studio.location}
                                    {schedule.categoryType == "retreat" && itemData.yogaSession.studio.location}
                                    </td>
                                    <td className="text-center flex  justify-center px-6 py-4">
                                        {/* {item.confirmedStatus && <Image alt='Booking Confirmed' width={35} height={35} src={"/checkmark.png"} />} */}
                                        {/* {!item.confirmedStatus && <Image alt='Cancel Booking' className='cursor-pointer' onClick={() => handleCancellation(item.id)} width={35} height={35} src={"/cancel-icon.png"} />} */}
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewSchedule;
