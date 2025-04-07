"use client";
import { useEffect, useRef, useState } from "react";

type JitsiMeetProps = {
  roomName: string;
  server: string;
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
    if (window.JitsiMeetExternalAPI) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    //script.src = "https://meet.jit.si/external_api.js";
    script.src = "https://localhost:8443/libs/external_api.min.js";
    //script.src = "/jitsi/libs/external_api.min.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("❌ No se pudo cargar el SDK de Jitsi");
    document.body.appendChild(script);
  }, [server]);

  useEffect(() => {
    if (!isScriptLoaded || !window.JitsiMeetExternalAPI || !jitsiContainerRef.current) return;

    //const domain = server.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const domain = "localhost:8443";

    const api = new window.JitsiMeetExternalAPI(domain, {
      roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName,
        email,
      },
      configOverwrite: {
        disableProfile: true,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableModeratorIndicator: true,
        enableWelcomePage: false,           // 👈 Evita que aparezca la pantalla de login inicial
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_POWERED_BY: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        DISABLE_FOCUS_INDICATOR: true,
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'chat',
          'raisehand',
          'hangup',
          'tileview',
          'fullscreen',
          'settings',
        ],
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
