"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useStateContext } from "@/utils/context/StateContext";
import { FaBars, FaTimes, FaUser, FaGlobe, FaUserPlus } from "react-icons/fa";
import LoginButton from "../Login/LoginButton";
import LoginModal from "../Login/LoginModal";

const Header = () => {
  const { cosmicUser } = useStateContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsDrawerOpen(false);
  };

  return (
    <>
    <header
        className={`fixed top-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
          <a href="#" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Logo" width={30} height={30} />
          </a>

          {/* 🔹 Menú de Navegación */}
          <nav className="hidden md:flex gap-6 text-gray-600">
            <button onClick={() => handleScrollToSection("services")} className="hover:text-blue-300">
              Servicios
            </button>
            <button onClick={() => handleScrollToSection("testimonials")} className="hover:text-blue-300">
              Testimonios
            </button>
            <button onClick={() => handleScrollToSection("quote")} className="hover:text-blue-300">
              Contacto
            </button>
            <button onClick={() => handleScrollToSection("about")} className="hover:text-blue-300">
              Nosotros
            </button>
          </nav>

          {/* 🔹 Botones de Acceso */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaGlobe size={20} />
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      🇺🇸 English
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      🇪🇸 Español
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* 🔹 Si el usuario está autenticado */}
            {cosmicUser?.id ? (
              <a href="/profile" className="btn btn-primary btn-sm flex items-center gap-2">
                <FaUser /> Mi cuenta
              </a>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {} }
                  className="btn btn-outline btn-primary text-blue-900 border-blue-300 hover:bg-blue-300 flex items-center gap-2"
                >
                  <FaUserPlus /> Crear cuenta
                </button>
                <LoginButton />
              </div>
            )}

            {/* 🔹 Menú móvil (Drawer) */}
            <button
              className="md:hidden btn btn-ghost btn-circle"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Drawer para móvil */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex">
            <aside className="w-64 bg-white shadow-lg p-6 relative">
              <button
                className="absolute top-4 right-4 btn btn-ghost btn-circle"
                onClick={() => setIsDrawerOpen(false)}
              >
                <FaTimes size={24} />
              </button>
              <nav className="flex flex-col gap-4 mt-6">
                <button onClick={() => handleScrollToSection("services")}>
                  Servicios
                </button>
                <button onClick={() => handleScrollToSection("testimonials")}>
                  Testimonios
                </button>
                <button onClick={() => handleScrollToSection("quote")}>
                  Contacto
                </button>
                <button onClick={() => handleScrollToSection("about")}>
                  Nosotros
                </button>
                <hr className="my-4" />
                {cosmicUser?.id ? (
                  <a href="/profile" className="btn btn-primary flex items-center gap-2">
                    <FaUser /> Mi cuenta
                  </a>
                ) : (
                  <div className="flex flex-col gap-2">
                    <a
                      href="/register"
                      className="btn btn-outline text-blue-900 border-blue-300 hover:bg-blue-300 flex items-center gap-2"
                    >
                      <FaUserPlus /> Crear cuenta
                    </a>
                    <LoginButton />
                  </div>
                )}
              </nav>
            </aside>
          </div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </> 
  );
};

export default Header;
