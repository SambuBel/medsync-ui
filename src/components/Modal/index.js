import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import Icon from "../Icon";

const Modal = ({
  outerClassName = "",
  containerClassName = "",
  visible,
  onClose,
  children,
  disable,
}) => {
  const escFunction = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (typeof window === "object" && !disable) {
      document.addEventListener("keydown", escFunction, false);
    }

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction, disable]);

  return (
    typeof window !== "undefined" &&
    visible &&
    createPortal(
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-12 animate-fadeIn overflow-auto">
        <div className={cn("relative w-full max-w-lg p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg", outerClassName)}>
          <div className={cn("m-auto", containerClassName)}>
            {children}
          </div>
          {!disable && (
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 hover:rotate-90 transition-transform"
              onClick={onClose}
            >
              <Icon name="close" size="14" />
            </button>
          )}
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
