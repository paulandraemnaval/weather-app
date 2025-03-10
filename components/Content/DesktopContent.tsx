"use client";
import React from "react";
import { useGlobalContext } from "@/Context/GlobalProvider";
import DesktopDashboard from "./Dashboard/DesktopDashboard";
const DesktopContent = () => {
  const { menu } = useGlobalContext();
  return (
    <div className="h-full flex flex-shrink object-cover">
      {menu === "Dashboard" && <DesktopDashboard />}
    </div>
  );
};

export default DesktopContent;
