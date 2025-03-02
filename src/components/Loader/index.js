import React from "react";
import cn from "classnames";

const Loader = ({ className, color = "default" }) => {
  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full relative text-transparent animate-loader",
        {
          "animate-loader-white": color === "white",
        },
        className
      )}
    ></div>
  );
};

export default Loader;
