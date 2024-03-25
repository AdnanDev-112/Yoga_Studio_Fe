"use client";

import {SessionProvider} from "next-auth/react";

const AuthProvider = ({children}) =>{
    return <SessionProvider refetchInterval={24 * 60 * 60} refetchOnWindowFocus={false}>{children}</SessionProvider>

}

export default AuthProvider;