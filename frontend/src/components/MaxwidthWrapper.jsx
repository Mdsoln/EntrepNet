import React, { ReactNode } from "react";

function MaxWidthWrapper({ children, className = "" }) {
  const classes = ["mx-auto", "w-full", "max-w-screen-xl", "md:px-16","p-2.5"].concat(className.split(" "));
  return (
    <div className={classes.join(" ")}>{children}</div>
  );
}

export default MaxWidthWrapper;
