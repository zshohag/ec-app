import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import type {
  Account,
  Profile,
  User as NextAuthUser,
  Session,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import { connectMongoDB } from "./mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: NextAuthUser | AdapterUser;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      if (account?.provider === "google") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, role: "user" }),
            });
            if (!res.ok) return false;
          }
        } catch (err) {
          console.error("❌ Sign-in error:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser | AdapterUser;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }) {
      if (user?.email) {
        await connectMongoDB();
        const dbUser = await User.findOne({ email: user.email });
        token.role = dbUser?.role || "user";
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user?: NextAuthUser | AdapterUser;
    }) {
      if (session?.user && token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

////////NO NEED

// lib/auth.ts
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/User";
// import { connectMongoDB } from "./mongodb";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET, // Required for session signing
//   debug: process.env.NODE_ENV === "development", // Enable debug in development
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         const { name, email } = user;
//         try {
//           await connectMongoDB();
//           const existingUser = await User.findOne({ email });

//           if (!existingUser) {
//             const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ name, email, role: "user" }),
//             });

//             if (!res.ok) {
//               const errorText = await res.text();
//               console.error(`❌ Failed to create user: ${errorText}`);
//               return false;
//             }
//           }
//           return true;
//         } catch (err) {
//           console.error("❌ Sign-in error:", err);
//           return false;
//         }
//       }
//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user?.email) {
//         await connectMongoDB();
//         const dbUser = await User.findOne({ email: user.email });
//         if (dbUser) {
//           token.role = dbUser.role || "user";
//         }
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session?.user && token?.role) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//   },
// };
