import React from "react";
import { imageSet1, imageSet2 } from "../lib/constants";
import Image from "next/image";
export default function ImageGrid() {
  return (
    <>
    <div className="flex flex-col gap-y-0 relative">
      <div className="grid grid-cols-2 gap-x-12">
        {imageSet1.map((imageObj) => (
          <Image
            key={imageObj.name}
            className= {`${imageObj.class}`}
            src={imageObj.src}
            width={150}
            height={150}
            alt={imageObj.name}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 relative left-36 -top-12">
        {imageSet2.map((imageObj) => (
          <Image
            key={imageObj.name}
            className= {`${imageObj.class}`}
            src={imageObj.src}
            width={150}
            height={150}
            alt={imageObj.name}
          />
        ))}
      </div>
      </div>
   
    </>
  );
}
