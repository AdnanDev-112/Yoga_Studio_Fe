// import Head from 'next/head';
// import { getServerSession } from "next-auth";
// import {options} from "./api/auth/[...nextauth]/options"
// import { redirect } from "next/navigation";

// const Home = async ()=> {
//   const session = await getServerSession(options);
  

//     if(!!session && session.user.userType == "admin"){
//         redirect("/Admin/dashboard");
        
//     }else if(!!session && session.user.userType == "user"){
//       redirect("/User/dashboard");
//     }
  
//   return (
//     <>
//       <Head>
//         <title>White Lotus Yoga</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
    

//       {/* Hero Section */}
//       <div className="hero bg-cover bg-center h-screen mr-2" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?yoga')` }}>
//         <div className="flex items-center justify-center h-full w-full bg-opacity-50 bg-gray-700">
//           <div className="text-center text-white px-6 md:px-12">
//             <h1 className="text-5xl font-bold mt-0 mb-6">Inspiring Healthier Lives Through Yoga</h1>
//             <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
//               Join Us Today
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Offerings Section */}
//       <section className="container mx-auto px-6 p-10">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">What We Offer</h2>
//         <div className="flex items-stretch space-x-4">
//           {/* Class Card */}
//           <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
//             <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,class" alt="Yoga Class" />
//             <div className="px-6 py-4">
//               <h3 className="font-bold text-xl mb-2">Yoga Classes</h3>
//               <p className="text-gray-700 text-base">
//                 Join our yoga classes tailored for all levels, from beginner to advanced. Experience the harmony of mind and body.
//               </p>
//             </div>
//           </div>

//           {/* Workshop Card */}
//           <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
//             <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,workshop" alt="Yoga Workshop" />
//             <div className="px-6 py-4">
//               <h3 className="font-bold text-xl mb-2">Workshops</h3>
//               <p className="text-gray-700 text-base">
//                 Dive deeper into your practice with our workshops on special topics and techniques.
//               </p>
//             </div>
//           </div>

//           {/* Course Card */}
//           <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
//             <img className="rounded-t-lg" src="https://source.unsplash.com/1600x900/?yoga,course" alt="Yoga Course" />
//             <div className="px-6 py-4">
//               <h3 className="font-bold text-xl mb-2">Yoga Courses</h3>
//               <p className="text-gray-700 text-base">
//                 Enroll in our courses for a comprehensive yoga journey. Perfect for those looking to deepen their practice.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-200">
//         <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//           <a href="#" className="text-xl font-bold text-gray-600">White Lotus</a>
//           <p className="py-2 text-gray-500 sm:py-0">All rights reserved © {new Date().getFullYear()}</p>
//         </div>
//       </footer>
//     </>
//   );
// }
// export default Home;

import Head from 'next/head';
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation';

const Home = async () => {
    const session = await getServerSession(options);
  

    if(!!session && session.user.userType == "admin"){
        redirect("/Admin/dashboard");
        
    }else if(!!session && session.user.userType == "user"){
      redirect("/User/dashboard");
    }

  return (
    <>
      <Head>
        <title>White Lotus Yoga</title>
        <meta name="description" content="Join White Lotus Yoga to inspire a healthier life through the practice of yoga. Discover our classes, workshops, and courses designed for all levels." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section with Material Design */}
      <div className="hero bg-gray-100">
        <div className="container mx-auto py-12 px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Inspiring Healthier Lives Through Yoga</h1>
              <p className="mb-6 text-gray-600">Join our community to explore the transformative power of yoga and discover your inner peace.</p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Join Us Today
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="https://source.unsplash.com/800x600/?yoga" alt="Yoga" className="rounded-lg shadow-md"/>
            </div>
          </div>
        </div>
      </div>

      {/* Offerings Section with Material Design */}
      <section className="my-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cards with Material Design */}
            {[
              { title: "Yoga Classes", description: "Join our yoga classes tailored for all levels, from beginner to advanced. Experience the harmony of mind and body.", image: "https://source.unsplash.com/800x600/?yoga,class" },
              { title: "Workshops", description: "Dive deeper into your practice with our workshops on special topics and techniques.", image: "https://source.unsplash.com/800x600/?yoga,workshop" },
              { title: "Yoga Courses", description: "Enroll in our courses for a comprehensive yoga journey. Perfect for those looking to deepen their practice.", image: "https://source.unsplash.com/800x600/?yoga,course" },
            ].map((offering, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img className="w-full" src={offering.image} alt={offering.title} />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{offering.title}</h3>
                  <p className="text-gray-700 text-base">
                    {offering.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modernized Footer with Material Design */}
      <footer className="bg-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center text-white">
            <a href="#" className="text-xl font-bold">White Lotus Yoga</a>
            <p>All rights reserved © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
