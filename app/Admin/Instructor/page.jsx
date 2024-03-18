'use client'

 
import { useRouter } from 'next/navigation'
 
const InstructorHome = () => {
  const router = useRouter();
  
  const handleRedirect = (path) => {
  
  const newPath = `/Admin/Instructor/${path}`;
  router.push(newPath);
  };
  return(
    <div className="flex justify-center items-center align-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-6">
        <div
          className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleRedirect('/Create')}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Register an Instructor</h5>
          <p className="font-normal text-gray-700">Onboard  an Instructor.</p>
        </div>
        <div
          className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleRedirect('/Read')}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">List Instructors</h5>
          <p className="font-normal text-gray-700">A List of Instructors .</p>
        </div>
        {/* <div
          className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleRedirect('/Update')}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Update</h5>
          <p className="font-normal text-gray-700">Make changes to Instructor Details.</p>
        </div>
        <div
          className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handleRedirect('/Delete')}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Delete</h5>
          <p className="font-normal text-gray-700">Fire an Instructor.</p>
        </div> */}
      </div>
    </div>
  )

};

export default InstructorHome;
