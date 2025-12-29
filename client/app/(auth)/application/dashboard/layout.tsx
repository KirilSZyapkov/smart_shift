import React from "react";
import SyncUser from "@/components/shared/SyncUser";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  return (
    <div>
      <SyncUser/>
      {children}
    </div>
  )
}