// import { ReactNode } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-6 bg-gray-50">{children}</main>
//     </div>
//   );
// }

import { Sidebar } from "@/components/shared/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
     
    </div>
  );
}
