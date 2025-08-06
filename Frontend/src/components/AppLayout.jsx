import React from "react";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

function AppLayout() {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#110E28] to-[#0D1117]">
      <AppNav />
      <main>
        {/* Child routes (Tickets, Admin, etc.) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
