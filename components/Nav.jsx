"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";




const Navbar = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true,callbackUrl:"/" });
  };

  return (
    <header className="bg-gray-800 text-white ">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center ">
        <Link href="/" className="no-underline">
          White Lotus
        </Link>
        <div className="flex items-center space-x-4">
          {/* Display based on session status */}
          {status === "authenticated" ? (
            <>
            {session.user.userType =="user" ? (
                <>
                <Link href="/User/dashboard" className="no-underline">Dashboard</Link>
                </>
            )
            :(
                <>
                <Link href="/Admin/dashboard" className="no-underline">Dashboard</Link>
                </>

            )}
              <button onClick={handleLogout} className="text-red-400 hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
            <Link href="/" className="no-underline">Home</Link>
            <Link href="/api/auth/signin" className="no-underline">Login</Link>
            {/* <Link href="/Admin/yoga_retreat" className="no-underline">Yoga Retreat</Link>
            <Link href="/User/feedback" className="no-underline">Feedback</Link> */}

            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
