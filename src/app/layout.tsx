// import type { Metadata } from "next";
// import { Poppins, Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Navbar } from "@/components/shared/Navbar";
// import { CartProvider } from "@/context/CartContext";
// import { Footer } from "@/components/shared/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   // ✅ Add this block
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: "ShopHub",
//   description: "A modern e-commerce app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-[var(--font-poppins)]`}
//         suppressHydrationWarning
//       >
     
//           <CartProvider>
//             <Navbar />
//             {children}
//             <Footer />
//           </CartProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/shared/Footer";
import { NextAuthProvider } from "@/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  // ✅ Add this block
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShopHub",
  description: "A modern e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} font-[var(--font-poppins)]`}
        suppressHydrationWarning
      >
     

     <NextAuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
     </NextAuthProvider>
      </body>
    </html>
  );
}
