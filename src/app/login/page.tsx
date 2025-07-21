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
//           onClick={handleLogin}
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

/// NEW ADD  WITH ZOD
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Zod schema
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else if (res?.ok) {
        toast.success("Signed in successfully!");
        router.push("/"); // or wherever you want to redirect
        router.refresh();
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/products" });
    } catch (error) {
      console.log(error)
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full border">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to ShopHub
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="my-4 text-center text-gray-500 text-sm">OR</div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          disabled={googleLoading}
        >
          <FcGoogle className="w-5 h-5" />
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        <p className="text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}