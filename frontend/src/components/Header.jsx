import React from "react";
import Button from "./Button";

export default function Header({fontSize}) {
  return (
  
      <div className="flex gap-x-5 items-center p-3">
      <button className='bg-[#FCA311] font-bold h-10 w-10 px'>
            logo
       </button>
      <div className={`font-bold ${fontSize}`}>Entrep<span className="text-orange-400 font-medium">Net</span></div>

    </div>

  );
}
