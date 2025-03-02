import React, { useState, useEffect } from "react";
import cn from "classnames";

const Theme = ({ className }) => {
  const [isDark, setIsDark] = useState(false);

  // Leer el tema desde localStorage al montar el componente
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setIsDark(storedTheme === "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Disparar evento global para sincronizar otros componentes
    window.dispatchEvent(new Event("themeChange"));
  };

  return (
    <label
      className={cn(
        "relative inline-block cursor-pointer select-none",
        { "w-10 h-5": className === "theme" },
        { "w-12 h-6": className === "theme-big" }
      )}
    >
      {/* Input invisible */}
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleDarkMode}
        className="absolute top-0 left-0 opacity-0 w-0 h-0"
      />

      {/* Contenedor del switch */}
      <span className="relative block w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-200">
        {/* Botón deslizante */}
        <span
          className={cn(
            "absolute top-1 left-1 w-3 h-3 bg-blue-500 rounded-full transition-all duration-200",
            { "translate-x-5": className === "theme-big" && isDark },
            { "translate-x-4": className !== "theme-big" && isDark }
          )}
        ></span>
      </span>
    </label>
  );
};

export default Theme;
