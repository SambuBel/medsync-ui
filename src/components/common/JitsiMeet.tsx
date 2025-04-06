"use client";
import { useEffect, useRef, useState } from "react";

type JitsiMeetProps = {
  roomName: string;
  server: string; // ejemplo: 'http://localhost:8001'
  displayName: string;
  email: string;
};

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const JitsiMeet = ({ roomName, server, displayName, email }: JitsiMeetProps) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 🔸 Verificamos si ya está cargado
    if (window.JitsiMeetExternalAPI) {
      setIsScriptLoaded(true);
      return;
    }

    // 🔸 Cargamos el SDK desde el servidor privado
    const script = document.createElement("script");
    //script.src = `${server}/libs/external_api.min.js`;
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("❌ No se pudo cargar el SDK de Jitsi desde el servidor");
    document.body.appendChild(script);
  }, [server]);

  useEffect(() => {
    if (!isScriptLoaded || !window.JitsiMeetExternalAPI || !jitsiContainerRef.current) return;

    const domain = server.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const api = new window.JitsiMeetExternalAPI(domain, {
      roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName,
        email,
      },
    });

    api.addEventListener("videoConferenceJoined", () => {
      console.log(`✅ ${displayName} se unió a la sala`);
    });

    return () => api.dispose();
  }, [isScriptLoaded, roomName, server, displayName, email]);

  return (
    <div className="w-full h-[80vh] rounded-xl shadow-lg bg-black">
      <div ref={jitsiContainerRef} className="w-full h-full" />
    </div>
  );
};

export default JitsiMeet;
