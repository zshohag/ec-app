// "use client";

// import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";

// export default function SignIn() {
//   const handleLogin = () => {
//     signIn("google", { callbackUrl: "/" }); // ✅ Redirects all users to home
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-slate-100 px-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center border border-gray-200">
//         <h1 className="text-3xl font-bold mb-4 text-gray-800">
//           Sign in to ShopHub
//         </h1>
//         <p className="text-gray-600 mb-6">Access your dashboard and orders</p>

//         <Button
//           onClick={() => signIn("google")}
//           variant="outline"
//           className="w-full flex items-center gap-3 justify-center text-base font-medium hover:bg-gray-50"
//         >
//           <FcGoogle className="w-5 h-5" />
//           Continue with Google
//         </Button>

//         <p className="text-sm text-gray-500 mt-6">
//           Don&apos;t have an account?{" "}
//           <span className="text-blue-600 font-medium hover:underline cursor-pointer">
//             Create one
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" }); // ✅ Redirects all users to home
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-slate-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Sign in to ShopHub
        </h1>
        <p className="text-gray-600 mb-6">Access your dashboard and orders</p>

        <Button
          onClick={handleLogin}
          variant="outline"
          className="w-full flex items-center gap-3 justify-center text-base font-medium hover:bg-gray-50"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </Button>

        <p className="text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
