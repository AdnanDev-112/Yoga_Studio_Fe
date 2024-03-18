"use client";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';


const BookingListPage = () => {
   const params = useParams();
   const router = useRouter();
   const [booking, setBooking] = useState([]);

   useEffect(() => {
      getData(); // Pass the id value to the getData function
   }, []);


   const handleBack = () => {
      router.push('/User/mybooking');
   };


   function handleDelete(id) {
      confirm("Are you sure you want to delete this booking?") && axios.delete('http://localhost:8080/booking/deletebooking/' + id)
         .then(response => {
            if (response.status == 204) {
               console.log(response.data)
               getData();
            }

         })
         .catch(error => {
            console.error('Error:', error);
         });

   }
   function getData() {
      axios.get('http://localhost:8080/booking/getbookingdetails/' + 2)
         .then(response => {
            console.log(response.data);
            setBooking(response.data);
         })
         .catch(error => {
            console.error('Error fetching booking data:', error);
            setBooking([]);
         });

   }




   return (
      <div className="booking-list">
         <div className="self-start mb-4 cursor-pointer span">
            <span onClick={() => handleBack()} className="text-base text-blue-500 hover:text-blue-700">
               ← Back
            </span>
         </div>
         <h1 className='text-center text-4xl text-gray-900 font-extralight dark:text-white'>Users Bookings List</h1>
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
                        Start Date
                     </th>
                     <th scope="col" className="text-center px-6 py-3">
                        Price
                     </th>
                     <th scope="col" className="text-center px-6 py-3">
                        Instructor
                     </th>
                     <th scope="col" className="text-center px-6 py-3">
                        Duration
                     </th>
                     <th scope="col" className="text-center px-6 py-3">
                        <span className="sr-only">Delete</span>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {booking && booking.map((booking, index) => (
                     <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {booking.categoryType || 'NA'}
                        </td>
                        <td className="text-center px-6 py-4">
                           {booking.level || 'NA'}
                        </td>
                        <td className="text-center px-6 py-4">
                           {booking.startDate || 'NA'}
                        </td>
                        <td className="text-center px-6 py-4">
                           £{booking.amount || '0'}
                        </td>
                        <td className="text-center px-6 py-4">
                           {booking.instructorName || 'NA'}
                        </td>
                        <td className="text-center px-6 py-4">
                           {booking.duration || 'NA'}
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


export default BookingListPage;
