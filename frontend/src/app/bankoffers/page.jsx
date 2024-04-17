import React from "react";
import Sidebar from "@/components/Sidebar";
import RightBar from "@/components/RightBar";
import BankOffersList from "@/components/BankOffersList"

export default function page() {
  return ( 
    <div className="h-full grid grid-cols-3 gap-64">
      <Sidebar />
      <BankOffersList/>
      <RightBar />
    </div>
  );
}
