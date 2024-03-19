//"use admin";
"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function waitingList() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter(); 

//   useEffect(() => {
//     getData(); // Pass the id value to the getData function
//  }, []);

//  function getData() {
//   axios.get('http://localhost:8080/booking/getbookingdetails/' + 2)
//      .then(response => {
//         console.log(response.data);
//         setBooking(response.data);
//      })
//      .catch(error => {
//         console.error('Error fetching booking data:', error);
//         setBooking([]);
//      });

// }
 const handleBack = () => {
    router.push('/Admin/WaitingList'); 
 }; 
  
  //  make this data contain table from backend ???
  const data = [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
  ];

  const handleApprove = (rowData) => {
    // Implement approve logic
    console.log("Approved: ", rowData);
  };

  const handleDelete = (rowData) => {
    // Implement delete logic
    console.log("Deleted: ", rowData);
  };

  const formStyles = {
    // CSS properties for the form
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "120vh",
    // background CSS properties
    backgroundImage:
      "url(https://www.stockvault.net/data/2013/07/23/146814/preview16.jpg)", // Replace 'path/to/your/image.jpg' with the actual path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px",
  };
  return (
    <div>
    <h1 className="text-center text-4xl text-gray-900 font-extra dark:text-white">
      Waiting List
    </h1>
    <br />
    <br />
    <table style={formStyles}>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="text-center px-6 py-3">
            Waiting ID
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Date Added
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Category Type
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Client ID
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Manager ID
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Booking ID
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Pending ID
          </th>
          <th scope="col" className="text-center px-6 py-3">
            Yoga Session ID
          </th>
          {/* Uncomment the below lines when using data */}
          {/* <th scope="col" className="text-center px-6 py-3">
            <span className="sr-only">Actions</span>
          </th> */}
        </tr>
      </thead>
      {/* Uncomment the below lines when using data */}
      {/* <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <button
                onClick={() => handleApprove(item)}
                type="submit"
                style={{
                  fontWeight: "bold",
                  padding: "5px 5px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleDelete(item)}
                type="submit"
                style={{
                  fontWeight: "bold",
                  padding: "5px 5px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody> */}
    </table>
  </div>
  );
}

// export default function manageWaitingList() {
//   const { data: session } = useSession();

//   const [formData, setFormData] = useState({
//      id: "",
//     category: "",
//     dateAdded: "",
//     bookingID: "",
//     managerID: "",
//     clientID: "",
//     pendingID: "",
//     yogaSessionID: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here, e.g., send data to backend
//     console.log(formData);
//     // Reset form fields after submission
//     setFormData({
//       id: "",
//       category: "",
//       dateAdded: "",
//       bookingID: "",
//       managerID: "",
//       clientID: "",
//       pendingID: "",
//       yogaSessionID: "",
//     });
//   };

// const formStyles = {
//   // CSS properties for the form
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   height: '120vh',
//   // background CSS properties
//   backgroundImage:'url(https://www.stockvault.net/data/2013/07/23/146814/preview16.jpg)', // Replace 'path/to/your/image.jpg' with the actual path to your image
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   padding: '40px',
// };

//   return (

//     <form style={formStyles} onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="id">Waiting ID:</label>
//         <input
//           type="text"
//           id="id"
//           name="id"
//           value={formData.id}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="category">Category:</label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="dateAdded"> Date Added: </label>
//         <input
//           type="date"
//           id="dateAdded"
//           name="dateAdded"
//           value={formData.dateAdded}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="bookingID">Booking ID: </label>
//         <input
//           type="text"
//           id="bookingID"
//           name="bookingID"
//           value={formData.bookingID}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="managerID">Manager ID:</label>
//         <input
//           type="text"
//           id="managerID"
//           name="managerID"
//           value={formData.managerID}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="price">Client ID:</label>
//         <input
//           type="text"
//           id="clientID"
//           name="clientID"
//           value={formData.clientID}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="id">Pending ID:</label>
//         <input
//           type="text"
//           id="pendingID"
//           name="pendingID"
//           value={formData.pendingID}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="id">Yoga Session ID:</label>
//         <input
//           type="text"
//           id="yogaSessionID"
//           name="yogaSessionID"
//           value={formData.yogaSessionID}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit" style={{ fontWeight: 'bold',
//     padding: '5px 5px',
//     backgroundColor: 'black',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',}}>ADD TO WAITING LIST</button>
//     </form>
//   );
// }
