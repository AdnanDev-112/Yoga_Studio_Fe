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
   const [clientId, setClientId] = useState(null);

   // const [clientId, setClientId] = useState(null);

   // useEffect(() => {
   //    getData(); // Pass the id value to the getData function
   //    // console.log(session.user.userID);
   // }, []);


   useEffect(() => {
      if (status === 'authenticated') {
          setClientId(session.user.userID);
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
   // const clientId = session.user.userID;
   function getData(id) {
      axios.get('http://localhost:9091/pendinglist/getbyclientid/' + id)
         .then(response => {
            console.log(response.data);
            setPendingListData(response.data);
         })
         .catch(error => {
            console.error('Error fetching booking data:', error);
            setPendingListData([]);
         });
      // axios.get('http://localhost:9091/booking/getbookingdetails/' + clientId)
      //    .then(response => {
      //       console.log(response.data);
      //       setPendingListData(response.data);
      //    })
      //    .catch(error => {
      //       console.error('Error fetching booking data:', error);
      //       setPendingListData([]);
      //    });

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
                  console.log(itemData,"itemData");
                  
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
                         {/* <td className="text-center px-6 py-4">
                         {booking.categoryType == "yoga_session" && itemData.studio ? itemData.studio.location || 'Not Assigned' : " "}
                         {booking.categoryType == "course" && itemData.yogaSession.studio.location}
                         {booking.categoryType == "retreat" && itemData.yogaSession.studio.location}
                         </td> */}
                         <td className="text-center flex  justify-center px-6 py-4">
                             {item.confirmedStatus && <Image alt='Booking Confirmed' width={35} height={35} src={"/checkmark.png"} />}
                             {!item.confirmedStatus && <Image alt='Cancel Booking' className='cursor-pointer' onClick={() => handleCancellation(item.id)} width={35} height={35} src={"/cancel-icon.png"} />}
                         </td>
                     </tr>
                 )

                  return (
                  <tr key={index} className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
                     <td className=" capitalize text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                     {booking.schedule.categoryType == "yoga_session" ? verifyYogaSessiontype(booking) : booking.schedule.categoryType || 'Not Assigned' }
                     </td> 
                     <td className="text-center px-6 py-4">
                     {booking.duration || 'Not Assigned session name'}
                     </td>
                      <td className="text-center px-6 py-4">
                        £{displayPricing(booking) || '0'}
                     </td>
                     <td className="text-center px-6 py-4">
                     {booking.schedule.date || 'Not Assigned'}
                     </td>
                     <td className="text-center px-6 py-4">
                        {itemData && itemData.instructor ? itemData.instructor.instructorName || 'Not Assigned' : " "}
                     </td>
                     <td className="text-center px-6 py-4">
                        {"Studio Loc"}
                     </td>
                     <td className="text-center flex  justify-center px-6 py-4">
                     {item.confirmedStatus && <Image alt='Booking Confirmed'  width={35} height={35} src={"/checkmark.png"}/>} 
                     {!item.confirmedStatus && <Image alt='Cancel Booking' className='cursor-pointer' onClick={()=>handleCancellation(item.id)}  width={35} height={35} src={"/cancel-icon.png"}/>} 
                     </td> 
                  </tr>
               )}
               )}   
            </tbody>
         </table>
      </div>
   </div>
);

};
export default BookingListPage;

// "use client";
// import { useRouter, useParams } from 'next/navigation';
// import axios from 'axios';
// import { useEffect, useState } from 'react';


// const BookingListPage = () => {
//   // const params = useParams();
//    const router = useRouter();
//    const [booking, setBooking] = useState([]);

//    useEffect(() => {
//       getData();
//    }, []);


//    const handleBack = () => {
//       router.push('/User/dashboard');
//    };

//    function getData() {
// axios.get('http://localhost:9091/booking/getbookingdetails/' + 11)
//          .then(response => {
//             console.log(response.data);
//             setBooking(response.data);
//          })
//          .catch(error => {
//             console.error('Error fetching booking data:', error);
//             setBooking([]);
//          });

//    }

//    return (
//       <div className="booking-list">
//          <div className="self-start mb-4 cursor-pointer span">
//             <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
//                ← Back
//             </span>
//          </div>
//          <h1 className='text-center text-4xl text-gray-900 font-extralight :text-white'>Users Bookings List</h1>
//          <br></br><br></br>
//          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
//                <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
//                   <tr><th scope="col" className="text-center px-6 py-3">Type Of Session</th>
//                      <th scope="col" className="text-center px-6 py-3">Level Type</th>
//                      <th scope="col" className="text-center px-6 py-3">Start Date</th>
//                      <th scope="col" className="text-center px-6 py-3">Price</th>
//                      <th scope="col" className="text-center px-6 py-3">Instructor</th>
//                      <th scope="col" className="text-center px-6 py-3">Duration</th>
//                      <th scope="col" className="text-center px-6 py-3"><span className="sr-only">Delete</span></th>
//                   </tr>
//                </thead>
//                <tbody>{booking && booking.map((booking, index) => (
//                   <tr key={index} className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
//                      <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">{booking.categoryType || 'Not Assigned'}</td>
//                      <td className="text-center px-6 py-4">{booking.level || 'Not Assigned'}</td>
//                      <td className="text-center px-6 py-4">{booking.startDate || 'Not Assigned'}</td>
//                      <td className="text-center px-6 py-4">£{booking.amount || '0'}</td>
//                      <td className="text-center px-6 py-4">{booking.instructorName || 'Not Assigned'}</td>
//                      <td className="text-center px-6 py-4">{booking.duration || 'Not Assigned'}</td>
//                   </tr>))}
//                </tbody>
//             </table>
//          </div>
//       </div>
//    );
// };


// export default BookingListPage;
