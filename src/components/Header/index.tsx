"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStateContext } from "@/utils/context/StateContext";
import { FaBars, FaTimes, FaUser, FaGlobe } from "react-icons/fa";

const Header = () => {
  const { cosmicUser } = useStateContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Logo" width={30} height={30} />
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-600">
          <Link href="/about" className="hover:text-primary">
            Nosotros
          </Link>
          <Link href="/services" className="hover:text-primary">
            Servicios
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contacto
          </Link>
        </nav>

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

          {cosmicUser?.id ? (
            <Link href="/profile" className="btn btn-primary btn-sm flex items-center gap-2">
              <FaUser /> Mi cuenta
            </Link>
          ) : (
            <Link href="/login" className="btn hover:bg-blue-500 bg-blue-300 btn-sm text-blue-900 border-none">
              Iniciar sesión
            </Link>
          )}

          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

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
              <Link href="/about" onClick={() => setIsDrawerOpen(false)}>
                Nosotros
              </Link>
              <Link href="/services" onClick={() => setIsDrawerOpen(false)}>
                Servicios
              </Link>
              <Link href="/contact" onClick={() => setIsDrawerOpen(false)}>
                Contacto
              </Link>
              <hr className="my-4" />
              {cosmicUser?.id ? (
                <Link href="/profile" className="btn btn-primary" onClick={() => setIsDrawerOpen(false)}>
                  Mi cuenta
                </Link>
              ) : (
                <Link href="/login" className="btn btn-primary bg-blue-300" onClick={() => setIsDrawerOpen(false)}>
                  Iniciar sesión
                </Link>
              )}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
