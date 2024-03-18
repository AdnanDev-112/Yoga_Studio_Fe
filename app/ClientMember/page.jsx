'use client';

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";


const ClientMember = async () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/ClientMember");
        }
    })

    return (
        <>
            <h1>Client Side Rendering</h1>





            <p>{session?.user?.userID}</p>
            <p>{session?.user?.userType}</p>
        </>
    )
}

export default ClientMember