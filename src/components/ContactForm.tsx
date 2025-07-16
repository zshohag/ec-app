// "use client";

// import { useState } from "react";

// export default function ContactForm() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("Sending...");

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       setStatus("Message sent!");
//       setForm({ name: "", email: "", message: "" });
//     } else {
//       setStatus("Failed to send message.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//       <input name="name" placeholder="Your Name" required onChange={handleChange} value={form.name} className="w-full p-2 border rounded" />
//       <input name="email" placeholder="Your Email" type="email" required onChange={handleChange} value={form.email} className="w-full p-2 border rounded" />
//       <textarea name="message" placeholder="Your Message" required onChange={handleChange} value={form.message} className="w-full p-2 border rounded h-32" />
//       <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send</button>
//       <p>{status}</p>
//     </form>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";

// export default function ContactForm() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("Sending...");

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       setStatus("✅ Message sent!");
//       setForm({ name: "", email: "", message: "" });
//     } else {
//       setStatus("❌ Failed to send message.");
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto p-6">
//       {/* Left Text Side */}
//       <div className="space-y-4">
//         <h1 className="text-3xl font-bold">Get in Touch with ShopHub</h1>
//         <p className="text-muted-foreground">
//           Have questions, feedback, or just want to connect? The ShopHub team is
//           here for you. Fill out the form and we’ll get back to you as soon as
//           possible.
//         </p>
//         <ul className="text-sm text-muted-foreground list-disc pl-4">
//           <li>24/7 customer support</li>
//           <li>Product inquiries and order issues</li>
//           <li>Wholesale, collaboration, or partnership opportunities</li>
//         </ul>
//       </div>

//       {/* Right Form Side */}
//       <Card className="w-full shadow-md">
//         <CardContent className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="Your name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="message">Message</Label>
//               <Textarea
//                 id="message"
//                 name="message"
//                 placeholder="Type your message here..."
//                 rows={5}
//                 value={form.message}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Send Message
//             </Button>
//             {status && (
//               <p className="text-sm text-muted-foreground">{status}</p>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
//import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("✅ Message sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl w-full">
        {/* Left Info Panel */}
        <div className="space-y-10">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">
              Contact ShopHub
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question about your order, a product, or want to partner
              with ShopHub? Send us a message and we&apos;ll get back to you
              quickly.
            </p>
          </div>

         
        </div>

        {/* Right Form Panel */}
        <Card className="w-full shadow-xl border border-gray-200">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>

              {status && (
                <p
                  className={`text-sm ${
                    status.includes("✅")
                      ? "text-green-600"
                      : status.includes("❌")
                      ? "text-red-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
