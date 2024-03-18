import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";



const UserDashboard = async () => {
  const session = await getServerSession(options);


  // Placeholder data for the purpose of this example
  const bookings = [{ id: 1, class: "Vinyasa Yoga", date: "2024-04-12" }];
  const classes = [{ id: 1, name: "Introduction to Meditation", date: "2024-04-15" }];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Welcome, {session?.user?.userType.toUpperCase()}</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Book Now */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Book Now</h2>
            {bookings.map((booking) => (
              <div key={booking.id} className="p-2 border-b">
                <p className="text-md font-semibold">{booking.class}</p>
                <p className="text-sm">{booking.date}</p>
              </div>
            ))}
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">View all</a>
            </div>
          </div>

          {/* My Bookings Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
            {bookings.map((booking) => (
              <div key={booking.id} className="p-2 border-b">
                <p className="text-md font-semibold">{booking.class}</p>
                <p className="text-sm">{booking.date}</p>
              </div>
            ))}
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">View all</a>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            {classes.map((classItem) => (
              <div key={classItem.id} className="p-2 border-b">
                <p className="text-md font-semibold">{classItem.name}</p>
                <p className="text-sm">{classItem.date}</p>
              </div>
            ))}
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">See all</a>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
export default UserDashboard;