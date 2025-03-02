import React, { useState } from "react";
import AppLink from "../../AppLink";
import cn from "classnames";
import Icon from "../../Icon";

const Group = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, "flex-1 md:flex-none md:w-1/2")}>
      {/* Botón del menú */}
      <div
        className="mb-10 font-bold text-lg cursor-pointer md:mb-8 relative md:px-0 px-8 py-4 border-b border-gray-300 dark:border-gray-600"
        onClick={() => setVisible(!visible)}
      >
        {"Menu" || item[0]?.title}
        <Icon
          name="arrow-bottom"
          size="10"
          className={`absolute right-4 top-1/2 transform transition-transform duration-200 ${
            visible ? "rotate-180" : ""
          } md:hidden`}
        />
      </div>

      {/* Menú desplegable */}
      <div className={`flex flex-col md:block ${visible ? "block" : "hidden"} pb-8 md:pb-0`}>
        {item?.map((x, index) => (
          <AppLink
            className="text-white hover:text-gray-400 dark:hover:text-blue-500 transition-colors mb-6 last:mb-0"
            href={x.url || "/"}
            key={index}
          >
            {x.title}
          </AppLink>
        ))}
      </div>
    </div>
  );
};

export default Group;
