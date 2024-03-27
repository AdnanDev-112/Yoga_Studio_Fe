'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';




const BookingListPage = () => {
   const router = useRouter();
   const { data: session, status } = useSession()
   const [pendingListData, setPendingListData] = useState([]);

   useEffect(() => {
      if (status === 'authenticated') {
          getData(session.user.userID);
      }
  }, [status, session]);
  

   const handleBack = () => {
      router.back();
   };


   function handleCancellation(id) {
      confirm("Are you sure you want to cancel this booking?") && axios.put('http://localhost:9091/pendinglist/cancelbooking/' + id)
         .then(response => {
            if (response.status == 204) {
               window.location.reload(true);
               getData();
            }

         })
         .catch(error => {
            console.error('Error:', error);
         });

   }

   function combineAndSortArrays(pendingList, waitingList) {
      const updatedWaitingList = waitingList.map(item => ({
         ...item,
         id: Math.floor(Math.random() * 1000000), // Generate a random ID
         confirmedStatus: false,
         inWaiting: true
      }));

      const combinedArray = [...pendingList, ...updatedWaitingList];

      const sortedArray = combinedArray.sort((a, b) => {
         const aDate = new Date(a.bookedTime || a.addDate);
         const bDate = new Date(b.bookedTime || b.addDate);

         return bDate - aDate; // Sort in descending order
      });

      return sortedArray;
   }


   async function getData(id) {
      let pendingList = [];
      let waitingList = [];
      await axios.get('http://localhost:9091/pendinglist/getbyclientid/' + id)
         .then(response => {
            setPendingListData(response.data);
            pendingList = response.data;
            
         })
         .catch(error => {
            console.error('Error fetching booking data:', error);
            setPendingListData([]);
         });
      await axios.get('http://localhost:9091/waitinglist/getwaitinglistbyclientid/' + id)
         .then(response => {
            waitingList = response.data;
         })
         .catch(error => {
            console.error('Error fetching Waiting list Data data:', error); 
         });
         const combinedData = combineAndSortArrays(pendingList,waitingList);
         setPendingListData(combinedData);

   }


   function calculateDiscountedPrice(originalPrice, discountValue) {
      const discountAmount = originalPrice * (discountValue / 100);
      const discountedPrice = originalPrice - discountAmount;
      return discountedPrice;
   }
   function displayPricing(booking){
      const categoryType = booking.schedule.categoryType;
      if( categoryType == 'course'){
         const discountData = booking.discountId;
         const discountValue = parseInt( discountData.discountValue);
         return calculateDiscountedPrice(booking.schedule.course.pricing.amount, discountValue);

      }else if(categoryType == 'yoga_session'){
         return booking.schedule.yogaSession.pricing.amount

      }else{
         return booking.schedule.retreat.pricing.amount
      }

 
   } 

   function objectKeyMapper (obj) {
      const categoryType = obj.schedule.categoryType; 
      if(categoryType == 'yoga_session'){
         return obj.schedule.yogaSession;
      }
      return obj.schedule[categoryType];
   }

   function verifyYogaSessiontype (item){
      return item.schedule.yogaSession.recurring ? "Class" : "Workshop";
   }

// Whitespace solver
return (
   <div className="booking-list">
      <div className="self-start mb-4 cursor-pointer span">
         <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
            ← Back
         </span>
      </div>
      <h1 className='text-center text-4xl text-gray-900 font-extralight :text-white'>Users Bookings List</h1>
      <br/><br/>

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
                     <span>
                     <Image alt='Down Arrow' className='cursor-pointer' src={"/down-arrow.png"} width={25} height={25}/>
                     </span>
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                     Instructor
                  </th>
                  {/* <th scope="col" className="text-center px-6 py-3">
                     Studio Location
                  </th> */}
                  <th scope="col" className="text-center px-6 py-3">
                     <span className="">Action</span>
                  </th>
               </tr>
            </thead>
            <tbody>   
               {pendingListData && pendingListData.map((item, index) => {
                  const booking = item.booking;
                  const itemData = objectKeyMapper(booking);
                  
                  
                  return (
                     <tr key={index} className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
                         <td className=" capitalize text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                         {booking.schedule.categoryType == "yoga_session" ? verifyYogaSessiontype(booking) : booking.schedule.categoryType || 'Not Assigned' }
                         </td>
                         <td className="text-center px-6 py-4">
                             {booking.schedule.yogaSession ? booking.schedule.yogaSession.sessionName : (booking.schedule.retreat ? booking.schedule.retreat.retreatName : (booking.schedule.course ? booking.schedule.course.courseName : ''))}
                         </td>
                         <td className="text-center px-6 py-4">
                             £{displayPricing(booking) || '0'}
                         </td>
                         <td className="text-center px-6 py-4">
                             {booking.schedule.date || 'Not Assigned'}
                         </td>
                         <td className="text-center px-6 py-4">
                             {booking.schedule.categoryType != "course" && itemData.instructor ? itemData.instructor.instructorName || 'Not Assigned' : " "}
                             {booking.schedule.categoryType == "course" && itemData.yogaSession.instructor.instructorName}
                         </td>
                         <td className="text-center flex justify-center items-center px-6 py-4">
                           {item.confirmedStatus && 
                              <div className='flex flex-col items-center'> 
                                 <Image alt='Booking Confirmed' width={35} height={35} src={"/checkmark.png"} />
                                 <span>Confirmed</span>
                              </div>
                           }
                           {!item.confirmedStatus && !item.inWaiting && 
                              <div className="flex flex-col items-center">
                                 <Image alt='Cancel Booking' title='Cancel Booking' className='cursor-pointer' onClick={() => handleCancellation(item.id)} width={35} height={35} src={"/cancel-icon.png"} />
                                 <span>Cancel</span>
                              </div> 
                           }
                           {!item.confirmedStatus && item.inWaiting && <p>In Waiting</p>}
                        </td>
                     </tr>
                 )

                     }
               )}   
            </tbody>
         </table>
      </div>
   </div>
);

};
export default BookingListPage;
