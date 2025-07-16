// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

// export default function Component() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     setIsSubmitting(false)
//     setIsSubmitted(true)

//     // Reset after 3 seconds
//     setTimeout(() => setIsSubmitted(false), 3000)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
//         {/* Contact Information */}
//         <div className="space-y-8">
//           <div className="space-y-4">
//             <Badge variant="secondary" className="w-fit">
//               Get in Touch
//             </Badge>
//             <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
//               Let&apos;s Start a Conversation
//             </h1>
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="flex items-center gap-4 group">
//               <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Email</h3>
//                 <p className="text-muted-foreground">hello@company.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 group">
//               <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
//                 <Phone className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Phone</h3>
//                 <p className="text-muted-foreground">+1 (555) 123-4567</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 group">
//               <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
//                 <MapPin className="w-5 h-5" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">Office</h3>
//                 <p className="text-muted-foreground">
//                   123 Business Ave, Suite 100
//                   <br />
//                   New York, NY 10001
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 p-4 ">
//           <CardHeader className="space-y-2">
//             <CardTitle className="text-2xl font-bold text-center mt-3 ">Send us a Message</CardTitle>
//             <CardDescription className="text-center">
//               Fill out the form below and we&apos;ll get back to you shortly.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName" className="text-sm font-medium">
//                     First Name
//                   </Label>
//                   <Input
//                     id="firstName"
//                     placeholder="John"
//                     required
//                     className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName" className="text-sm font-medium">
//                     Last Name
//                   </Label>
//                   <Input
//                     id="lastName"
//                     placeholder="Doe"
//                     required
//                     className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   required
//                   className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="subject" className="text-sm font-medium">
//                   Subject
//                 </Label>
//                 <Input
//                   id="subject"
//                   placeholder="How can we help you?"
//                   required
//                   className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="message" className="text-sm font-medium">
//                   Message
//                 </Label>
//                 <Textarea
//                   id="message"
//                   placeholder="Tell us more about your inquiry..."
//                   rows={5}
//                   required
//                   className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg resize-none"
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSubmitting || isSubmitted}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed  "
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     Sending...
//                   </div>
//                 ) : isSubmitted ? (
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4" />
//                     Message Sent!
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <Send className="w-4 h-4" />
//                     Send Message
//                   </div>
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="p-6">
      <ContactForm />
    </div>
  );
}
