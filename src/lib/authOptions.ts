// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import GoogleProvider from 'next-auth/providers/google';

// import type { NextAuthOptions } from 'next-auth';
// import clientPromise from './clientPromise';

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       image?: string;
//     }
//   }
// }

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async session({ session, token }: { session: any; token: any }) {
//       if (session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// };


// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import GoogleProvider from 'next-auth/providers/google';
// import clientPromise from './clientPromise';

// export const authOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async session({ session, token }: { session: import("next-auth").Session; token: import("next-auth/jwt").JWT }) {
//       if (session.user) {
//         session.user.id = token.sub as string;
//       }
//       return session;
//     },
//   },
// } satisfies import("next-auth").NextAuthOptions;

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './clientPromise';

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }: { session: import("next-auth").Session; token: import("next-auth/jwt").JWT }) {
        if (session.user) {
            session.user.id = token.sub as string;
        }
        return session;
        },
    },
  
} 