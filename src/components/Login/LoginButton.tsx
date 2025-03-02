import React, { useState } from "react";
import LoginModal from "./LoginModal";
import { FaSignInAlt } from "react-icons/fa";

const LoginButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary text-white bg-blue-500 hover:bg-blue-600 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
         <FaSignInAlt /> Iniciar Sesión
      </button>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LoginButton;
