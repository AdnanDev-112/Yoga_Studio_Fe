// import { getServerSession } from "next-auth";
// import { options } from "../../api/auth/[...nextauth]/options";
// import Link from "next/link";



// const UserDashboard = async () => {
//   const session = await getServerSession(options);


//   // Placeholder data for the purpose of this example
//   const bookings = [{ id: 1, class: "Vinyasa Yoga", date: "2024-04-12" }];
//   const classes = [{ id: 1, name: "Introduction to Meditation", date: "2024-04-15" }];

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-8">
//         <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Welcome, {session?.user?.userType.toUpperCase()} {session?.user?.userID}</h1>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

//           {/* Book Now */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-semibold mb-4">Book Now</h2>
//             {bookings.map((booking) => (
//               <div key={booking.id} className="p-2 border-b">
//                 <p className="text-md font-semibold">{booking.class}</p>
//                 <p className="text-sm">{booking.date}</p>
//               </div>
//             ))}
//             <div className="text-right mt-2">
//               <Link href="/User/BookNow" className="text-blue-500 hover:text-blue-700 ">Book Now</Link>
//             </div>
//           </div>

//           {/* My Bookings Card */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
//             {bookings.map((booking) => (
//               <div key={booking.id} className="p-2 border-b">
//                 <p className="text-md font-semibold">{booking.class}</p>
//                 <p className="text-sm">{booking.date}</p>
//               </div>
//             ))}
//             <div className="text-right mt-2">
//             <Link href="/User/Mybooking/" className="text-blue-500 hover:text-blue-700">View all Bookings</Link>
//             </div>
//           </div>

//           {/* Schedule */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-semibold mb-4">Schedule</h2>
//             {classes.map((classItem) => (
//               <div key={classItem.id} className="p-2 border-b">
//                 <p className="text-md font-semibold">{classItem.name}</p>
//                 <p className="text-sm">{classItem.date}</p>
//               </div>
//             ))}
//             <div className="text-right mt-2">
//               <a href="#" className="text-blue-500 hover:text-blue-700">See all</a>
//             </div>
//           </div>



//         </div>
//       </div>
//     </div>
//   );
// }
// export default UserDashboard;

import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const UserDashboard = async () => {
  const session = await getServerSession(options);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-0">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">Welcome Back! {session?.user?.userType.toUpperCase()} {session?.user?.userID}</h1>
        <p className="text-center text-lg text-gray-600 mb-10">Ready to deepen your yoga practice today?</p>
        
        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard 
            title="Book Your Next Class" 
            description="Explore and book your next class to stay on track with your yoga journey."
            buttonText="Book Now"
            buttonLink="/User/BookNow"
          />

          <DashboardCard 
            title="My Bookings" 
            description="Review your upcoming and past bookings to keep track of your progress."
            buttonText="View Bookings"
            buttonLink="/User/mybooking"
          />

          <DashboardCard 
            title="Studio Schedule" 
            description="Check out the schedule of  and upcoming classes."
            buttonText="View schedule"
            buttonLink="/User/Viewschedule"
          />
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, description, buttonText, buttonLink }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-700 mb-6">{description}</p>
    <Link href={buttonLink}>
      <span className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        {buttonText}
      </span>
    </Link>
  </div>
);

export default UserDashboard;
