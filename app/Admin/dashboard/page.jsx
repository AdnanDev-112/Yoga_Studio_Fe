"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';



export default function AdminDashboard() {
  const { data: session } = useSession();


  // Placeholder data for the purpose of this example
  const insights = {
    totalClasses: 120,
    totalBookings: 450,
    revenue: 15000,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Activites aka Classes/Workshop */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Activities</h2>
            <p>Manage and schedule new Activities (classes and workshops).</p>
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">Manage</a>
            </div>
          </div>

          {/* Course */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <p>Manage courses.</p>
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">Manage</a>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p>View and manage user registrations and bookings.</p>
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">View Users</a>
            </div>
          </div>

          {/* Studio Insights */}
          <div className="bg-white rounded-lg shadow p-4 col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Studio Insights</h2>
            <ul>
              <li>Total Classes: {insights.totalClasses}</li>
              <li>Total Bookings: {insights.totalBookings}</li>
              <li>Revenue: ${insights.revenue}</li>
            </ul>
            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">More Insights</a>
            </div>
          </div>

          {/* Instructor */}        
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Instructor</h2>
            <p>View and manage Instructors</p>
            <div className="text-right mt-2">
              <Link href="/Admin/Instructor" className="text-blue-500 hover:text-blue-700">View</Link>
            </div>
          </div>
          
          

          
        </div>
      </div>
    </div>
  );
}
