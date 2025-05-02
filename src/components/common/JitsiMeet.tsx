"use client";
import { useEffect, useRef, useState } from "react";
import WaitingRoom from "../Guardia/WaitingRoom";
import io from "socket.io-client";

interface JitsiMeetProps {
  roomName: string;
  server: string;
  displayName: string;
  email: string;
  role: 'patient' | 'moderator';
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const JitsiMeet = ({ roomName, server, displayName, email, role, status }: JitsiMeetProps) => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

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
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      withCredentials: true,
      transports: ['websocket']
    });
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('joinWaitingRoom', { 
        roomName, 
        userId: email 
      });
    });
  
    socket.on('consultationEnded', (data) => {
      console.log('Consultation ended:', data);
      if (data.roomName === roomName) {
        const redirectPath = role === 'patient' 
          ? '/profile?tab=record-appointments'
          : `/profile?tab=consultation-summary&visitId=${data.emergencyVisitId}`;
        window.location.replace(redirectPath);
      }
    });
  
    return () => { 
      socket.disconnect(); 
    };
  }, [roomName, role, email]);

  useEffect(() => {
    if (!isScriptLoaded || !window.JitsiMeetExternalAPI || !jitsiContainerRef.current || hasEnded) return;

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
        enableWelcomePage: false,
        enableLobby: true,
        enableLobbyChat: false,
        prejoinPageEnabled: false,
        readOnlyName: true,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_POWERED_BY: false,
      },
    });

    // Conectar WebSocket
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      withCredentials: true,
      transports: ['websocket']
    });

    socket.on('consultationEnded', (data) => {
      console.log('Received consultationEnded event:', data);
      if (data.roomName === roomName) {
        // Forzar cierre de la llamada
        api.executeCommand('hangup');
        api.dispose();
        
        // Redirigir según el rol
        const redirectPath = role === 'patient' 
          ? '/profile?tab=record-appointments'
          : `/profile?tab=consultation-summary&visitId=${data.emergencyVisitId}`;
        window.location.replace(redirectPath);
      }
    });

    const handleEndMeeting = async () => {
      if (hasEnded) return;
      setHasEnded(true);
      
      try {
        // Si es el doctor, notificar al backend
        if (role === 'moderator') {
          await fetch('/api/jitsi/consultation/end', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              roomName,
              userId: email
            }),
          });
          // El doctor ejecuta el comando de finalizar conferencia
          api.executeCommand('endConference');
        }
        // La redirección ocurrirá cuando se reciba el evento consultationEnded
      } catch (error) {
        console.error('Error al finalizar la llamada:', error);
        setHasEnded(false);
      }
    };

    // Eventos específicos para el paciente
    if (role === 'patient') {
      api.addEventListeners({
        participantLeft: (participant: any) => {
          if (participant.role === 'moderator') {
            console.log('El doctor abandonó la llamada');
            // No hacer nada aquí, esperar el evento consultationEnded
          }
        },
        videoConferenceLeft: () => {
          // Solo manejar si no ha terminado ya
          if (!hasEnded) {
            handleEndMeeting();
          }
        }
      });
    } else {
      // Eventos para el doctor
      api.addEventListeners({
        videoConferenceLeft: handleEndMeeting,
        readyToClose: handleEndMeeting
      });
    }

    // Manejar el botón de colgar
    api.on('toolbarButtonClicked', (buttonName: string) => {
      if (buttonName === 'hangup') {
        handleEndMeeting();
      }
    });

    return () => {
      socket.disconnect();
      if (!hasEnded) {
        api.dispose();
      }
    };
  }, [isScriptLoaded, roomName, server, displayName, email, role, hasEnded]);

  if (role === 'patient' && status === 'WAITING') {
    return <WaitingRoom roomName={roomName} user={{
      id: '1',
      name: displayName,
      lastName: '',
      email: email,
      role: 'PATIENT',
      phone: ''
    }} />;
  }

  if (hasEnded) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Finalizando consulta...</h3>
          <p className="text-gray-600">Serás redirigido en un momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] rounded-xl shadow-lg bg-black">
      <div ref={jitsiContainerRef} className="w-full h-full" />
    </div>
  );
};

export default JitsiMeet;
