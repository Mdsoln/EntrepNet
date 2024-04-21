import React, { ReactNode } from "react";
import  Header from "../components/Header";
function MaxWidthWrapper({ children, className = "" }) {
  const classes = ["mx-auto", "w-full", "max-w-screen-xl", "md:px-16","p-2.5"].concat(className.split(" "));
  return (
  
    <div className={classes.join(" ")}>
      <Header fontSize={"text-4xl "}/>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
