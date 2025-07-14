"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut, Package } from "lucide-react";
import { ShoppingCartSheet } from "../ShoppingCartSheet";


export function Navbar() {
  const user = { role: "admin" }; // Mock user data
  const session = { user: { name: "John Doe", email: "john@example.com" } }; // Mock session data

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">🛍️ ShopHub</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Premium Store
              </Badge>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ShoppingCartSheet />

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  {user?.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/admin"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/user"
                        className="flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/user/manage-orders"
                      className="flex items-center"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// 'use client';

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setAuthUser } from "@/redux/features/authSlice";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { User, Settings, LogOut, Package } from "lucide-react";
// import { ShoppingCartSheet } from "../ShoppingCartSheet";

// export function Navbar() {
//   const { data: session, status } = useSession();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (session?.user) {
//       dispatch(
//         setAuthUser({
//           name: session.user.name!,
//           email: session.user.email!,
//           image: session.user.image!,
//         })
//       );
//     }
//   }, [session, dispatch]);

//   const userRole = session?.user?.email === "admin@example.com" ? "admin" : "user"; // Customize role check

//   return (
//     <header className="bg-white shadow-sm border-b sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-4">
//             <Link href="/" className="flex items-center gap-2">
//               <h1 className="text-2xl font-bold text-gray-900">🛍️ ShopHub</h1>
//               <Badge variant="secondary" className="hidden sm:inline-flex">
//                 Premium Store
//               </Badge>
//             </Link>
//           </div>

//           {/* Navigation Links */}
//           <nav className="hidden md:flex items-center gap-6">
//             <Link
//               href="/products"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Products
//             </Link>
//             <Link
//               href="/about"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Contact
//             </Link>
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center gap-4">
//             <ShoppingCartSheet />

//             {status === "authenticated" && session?.user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-10 w-10 rounded-full"
//                   >
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end">
//                   <div className="flex items-center justify-start gap-2 p-2">
//                     <div className="flex flex-col space-y-1 leading-none">
//                       <p className="font-medium">{session.user.name}</p>
//                       <p className="w-[200px] truncate text-sm text-muted-foreground">
//                         {session.user.email}
//                       </p>
//                     </div>
//                   </div>
//                   <DropdownMenuSeparator />

//                   {userRole === "admin" ? (
//                     <DropdownMenuItem asChild>
//                       <Link
//                         href="/dashboard/admin"
//                         className="flex items-center"
//                       >
//                         <Settings className="mr-2 h-4 w-4" />
//                         Admin Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                   ) : (
//                     <DropdownMenuItem asChild>
//                       <Link
//                         href="/dashboard/user"
//                         className="flex items-center"
//                       >
//                         <User className="mr-2 h-4 w-4" />
//                         My Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                   )}

//                   <DropdownMenuItem asChild>
//                     <Link
//                       href="/dashboard/user/manage-orders"
//                       className="flex items-center"
//                     >
//                       <Package className="mr-2 h-4 w-4" />
//                       My Orders
//                     </Link>
//                   </DropdownMenuItem>

//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="cursor-pointer"
//                     onClick={() => signOut()}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Sign out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button variant="ghost" asChild>
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button asChild>
//                   <Link href="/signup">Sign Up</Link>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
