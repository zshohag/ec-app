import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return true; // Allow sign-in
            }
          }
        } catch (error) {
          console.error("Error during sign-in:", error);
        }
      }
      return true; // Allow sign-in for other providers or if user exists
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }: { user: any; account: any }) {
//       if (account.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectMongoDB();
//           const userExists = await User.findOne({ email });

//           if (!userExists) {
//             const res = await fetch("http://localhost:3000/api/user", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 name,
//                 email,
//               }),
//             });

//             if (res.ok) {
//               return user;
//             }
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }

//       return user;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// src/app/api/auth/[...nextauth]/route.ts
// import { connectMongoDB } from "@/lib/mongodb";
// import User, { IUser } from "@/models/User"; // Ensure you import IUser if you want to use it for typing
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// import type {
//   NextAuthOptions,
//   Account,
//   Profile,
//   User as NextAuthCallbackUser,
// } from "next-auth";


// const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string, // Cast to string as env vars can be undefined
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Cast to string
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }: { user: NextAuthCallbackUser; account: Account; profile?: Profile }) {
//       if (account.provider === "google") {
//         // user object from Google will have name, email, and potentially image
//         const { name, email, image } = user; // Destructure image as well

//         // Ensure email exists before proceeding
//         if (!email) {
//             console.error("Google sign-in attempted without an email address.");
//             return false; // Prevent sign-in if no email is provided
//         }

//         try {
//           await connectMongoDB(); // Connect to your MongoDB database

//           // Check if the user already exists in your database by email
//           const userExists = await User.findOne({ email });

//           if (!userExists) {
//             // If the user does not exist, create a new entry in your database
//             await User.create({
//               name,
//               email,
//               image, // Save the Google profile picture URL
//               // You can add other default fields here, e.g., role: 'user'
//             });
//             console.log("New user created in MongoDB:", email);
//           } else {
//             // User already exists. You might want to update their information
//             // For example, if their name or image changes on Google
//             // Or just log that the user exists.
//             console.log("User already exists in MongoDB:", email);

//             // Optional: Update user info if it changed
//             // if (userExists.name !== name || userExists.image !== image) {
//             //   userExists.name = name;
//             //   userExists.image = image;
//             //   await userExists.save();
//             //   console.log("Existing user updated in MongoDB:", email);
//             // }
//           }
//           return true; // Allow the sign-in process to continue
//         } catch (error) {
//           console.error("Error during Google sign-in and MongoDB operation:", error);
//           // Return false to prevent the sign-in if a database error occurs
//           return false;
//         }
//       }
//       return true; // Allow sign-in for other providers if applicable
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in .env.local
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };