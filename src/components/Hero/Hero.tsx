"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaUserMd, FaHeartbeat, FaHandHoldingMedical } from "react-icons/fa";

const words = ["RÁPIDA", "SEGURA", "CONFIABLE"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (letterIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentWord[letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setText("");
          setLetterIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsFadingOut(false);
        }, 600);
      }, 2000);
    }
  }, [letterIndex, wordIndex]);

  const cards = [
    {
      title: "Planes accesibles",
      icon: <FaUserMd size={30} />,
      offset: "-translate-x-10 md:-translate-x-14",
    },
    {
      title: "Atención 24/7",
      icon: <FaHeartbeat size={30} />,
      offset: "translate-x-10 md:translate-x-14",
    },
    {
      title: "Consultas en línea",
      icon: <FaHandHoldingMedical size={30} />,
      offset: "-translate-x-10 md:-translate-x-14",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white text-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Fondo Hero"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-80"
          priority
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        <motion.div
          className="text-left flex flex-col justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          >
            Atención Médica 24/7
          </motion.h1>

          <motion.p
            className="mt-2 text-2xl font-semibold text-blue-300 tracking-wide uppercase min-h-[40px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {text || "‎"}
          </motion.p>

          <motion.p
            className="mt-4 text-lg text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
          >
            Encuentra médicos especialistas en línea y obtén asistencia inmediata
            desde cualquier lugar.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`w-56 h-24 flex flex-col items-center justify-center bg-white/20 backdrop-blur-lg rounded-xl shadow-lg cursor-pointer transition-all hover:scale-110 hover:shadow-2xl ${card.offset}`}
              whileHover={{ scale: 1.15, y: -10 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {card.icon}
              <h3 className="mt-2 text-md font-semibold text-white">{card.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
