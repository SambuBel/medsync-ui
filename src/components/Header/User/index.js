import React, { useState } from "react";
import { useRouter } from "next/router";
import OutsideClickHandler from "react-outside-click-handler";
import Image from "../../Image";
import Icon from "../../Icon";
import { removeToken } from "../../../utils/token";
import { useStateContext } from "../../../utils/context/StateContext";

const User = ({ className, user }) => {
  const { setCosmicUser } = useStateContext();
  const [visible, setVisible] = useState(false);
  const { push } = useRouter();

  const items = [
    {
      title: "Disconnect",
      icon: "exit",
      callback: () => {
        setCosmicUser({});
        push("/");
        removeToken();
      },
    },
  ];

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={`relative ${className}`}>
        {/* Avatar y Nombre */}
        <div
          className="flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all hover:border-blue-500"
          onClick={() => setVisible(!visible)}
        >
          <Image
            className="w-8 h-8 rounded-full"
            size={{ width: "32px", height: "32px" }}
            src={user?.["avatar_url"] || "/images/content/avatar.png"}
            alt="Avatar"
            objectFit="cover"
          />
          <div className="ml-3 text-gray-700 dark:text-gray-300 hidden md:block">
            {user?.["first_name"] || "User"}
          </div>
        </div>

        {/* Menú desplegable */}
        {visible && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2 transition-all">
            <div className="space-y-2">
              {items.map((x, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 transition-all border-b border-gray-300 dark:border-gray-600 last:border-0"
                  onClick={x.callback}
                >
                  <Icon name={x.icon} size="20" className="mr-3 text-gray-500" />
                  <div className="flex-1">{x.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
