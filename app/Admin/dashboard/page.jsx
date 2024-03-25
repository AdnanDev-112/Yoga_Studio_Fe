import Link from "next/link";

// DashboardCard Component for Admin Dashboard
const DashboardCard = ({ title, description, buttonLink, buttonText }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{description}</p>
    </div>
    <div className="text-right mt-2">
      <Link href={buttonLink}>
        <span className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          {buttonText}
        </span>
      </Link>
    </div>
  </div>
);

export default function AdminDashboard() {
  // Placeholder data for the purpose of this example
  const insights = {
    totalClasses: 120,
    totalBookings: 450,
    revenue: 15000,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container flex flex-col justify-between gap-y-4 mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Activities Management */}
        <div className="container">
          <h2 className="my-2 text-2xl bold font-extrabold">Activities Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Yoga Sessions"
              description="Manage and schedule new sessions (classes and workshops)."
              buttonLink="/Admin/Yogasession/"
              buttonText="View"
            />
            <DashboardCard 
              title="Courses"
              description="Manage courses."
              buttonLink="/Admin/Course"
              buttonText="View"
            />
            <DashboardCard 
              title="Yoga Retreat"
              description="View and manage Yoga Retreat Sessions"
              buttonLink="/Admin/Yogaretreat"
              buttonText="View"
            />
          </div>
        </div>

        {/* User Management */}
        <div className="container">
          <h2 className="my-2 text-2xl bold font-extrabold">User Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Client Management"
              description="View and manage user registrations."
              buttonLink="/Admin/Clientmanagement"
              buttonText="View"
            />
            <DashboardCard 
              title="Waiting List"
              description="View and manage Waiting list for the classes"
              buttonLink="/Admin/Waitinglist"
              buttonText="View"
            />
          </div>
        </div>

        {/* Schedule Management */}
        <div className="container">
          <h2 className="my-2 text-2xl bold font-extrabold">Schedule Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Schedule"
              description="View and manage Scheduled Sessions"
              buttonLink="/Admin/Schedule"
              buttonText="View"
            />
          </div>
        </div>

        {/* Instructor Management */}
        <div className="container">
          <h2 className="my-2 text-2xl bold font-extrabold">Instructor Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Instructor"
              description="View and manage Instructors"
              buttonLink="/Admin/Instructor"
              buttonText="View"
            />
          </div>
        </div>

        {/* Studio Management */}
        <div className="container">
          <h2 className="my-2 text-2xl bold font-extrabold">Studio Management</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Studio Insights"
              description={`Total Classes: ${insights.totalClasses}, Total Bookings: ${insights.totalBookings}, Revenue: $${insights.revenue}`}
              buttonLink="/Admin/Studioinsights"
              buttonText="More Insights"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
``
