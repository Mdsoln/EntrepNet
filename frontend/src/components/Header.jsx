import React from "react";
import MaxWidthWrapper from "./MaxwidthWrapper";
import Button from "./Button";

export default function Header() {
  return (
    <MaxWidthWrapper>
      <div className="flex gap-x-5 items-center">
      <button className='bg-[#FCA311] font-bold h-10 w-10 px'>
            logo
       </button>
      <div className="font-bold text-4xl">Entrep<span className="text-orange-400 font-medium">Net</span></div>

    </div>
    </MaxWidthWrapper>
  );
}
