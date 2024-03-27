import  CredentialsProvider  from "next-auth/providers/credentials"

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userID: {
                    label: "User ID",
                    type: "text",
                    placeholder: "Your ID"
                },
                userType: {
                    label: "User Type",
                    type: "text",
                    placeholder: "User/Admin"
                },
            },
            async authorize(credentials) {
                const adminUser = { userID: "0", userType: "admin" };
                const normalUser1 = { userID: "1", userType: "user" };
                const normalUser2 = { userID: "2", userType: "user" }; 

                try {
                    if (credentials.userID == "0") {
                        return adminUser;
                    } else if(credentials.userID == "1") {
                        return normalUser1;
                    }else{
                        return normalUser2;
                    }
                } catch (error) {
                    console.log(error);

                }
                return null;
            }
        })

    ],

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.userType = user.userType;
            token.userID = user.userID;
        }
          return token;
        },
        async session({ session, token }) {
          if (session?.user) {
            session.user.userID = token.userID;
            session.user.userType = token.userType
        };
          return session;
        },
      },
}