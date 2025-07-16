// // app/api/contact/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { transporter, mailOptions } from "@/lib/mail";

// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, message } = await req.json();

//     await transporter.sendMail({
//       ...mailOptions,
//       subject: `New Contact Form Message from ${name}`,
//       html: `
//         <h2>Contact Message</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong><br/>${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Email failed" }, { status: 500 });
//   }
// }

// app/api/contact/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { transporter, mailOptions } from "@/lib/mail";

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, message } = await request.json();

//     if (!name || !email || !message) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     await transporter.sendMail({
//       ...mailOptions,
//       subject: `New message from ${name}`,
//       html: `
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("💥 Email send error:", error.message);
//     } else {
//       console.error("💥 Email send error:", error);
//     }
//     return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("🚀 Sending email:", { name, email, message });

    const result = await transporter.sendMail({
      ...mailOptions,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("✅ Email sent:", result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("💥 Email send error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
