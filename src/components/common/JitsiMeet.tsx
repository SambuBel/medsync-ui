"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const apiRef = useRef<any>(null);

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
    if (!isScriptLoaded || !window.JitsiMeetExternalAPI || !jitsiContainerRef.current || hasEnded) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      withCredentials: true,
      transports: ['websocket']
    });

    const domain = "localhost:8443";
    const api = new window.JitsiMeetExternalAPI(domain, {
      roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: { displayName, email },
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
    
    apiRef.current = api;

    const handleConsultationEnd = async (data: any) => {
      console.log('Received consultationEnded event:', data);
      if (data.roomName === roomName) {
        setHasEnded(true);
        
        // Primero cerramos la llamada
        if (apiRef.current) {
          apiRef.current.executeCommand('hangup');
          apiRef.current.dispose();
        }

        // Redirigir según el rol
        if (role === 'patient') {
          router.push('/profile?tab=record-appointments');
        } else {
          // Para el doctor, usar el ID de la visita y nombre del paciente
          router.push(`/profile?tab=consultation-summary&visitId=${data.emergencyVisitId}&patientName=${encodeURIComponent(data.patientName)}`);
        }
      }
    };

    const handleEndMeeting = async () => {
      if (hasEnded) return;
      
      try {
        if (role === 'moderator') {
          console.log('Doctor ending meeting...');
          const response = await fetch('/api/guardia/end', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ 
              roomName, 
              userId: email 
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to end consultation');
          }

          const data = await response.json();
          
          // El doctor ejecuta el comando de finalizar conferencia
          api.executeCommand('endConference');
          setHasEnded(true);

          // Emitir evento de finalización
          socket.emit('consultationEnded', {
            roomName,
            emergencyVisitId: data.emergencyVisitId,
            patientName: data.patientName
          });
        }
      } catch (error) {
        console.error('Error ending meeting:', error);
        setHasEnded(false);
      }
    };

    // Eventos de Jitsi
    api.addEventListeners({
      readyToClose: handleEndMeeting,
      videoConferenceLeft: () => {
        if (role === 'moderator') {
          handleEndMeeting();
        }
      },
      participantLeft: (participant: any) => {
        if (role === 'patient' && participant.role === 'moderator') {
          console.log('Doctor left the call');
          // El paciente espera el evento consultationEnded
        }
      }
    });

    // Botón de colgar
    api.on('toolbarButtonClicked', (buttonName: string) => {
      if (buttonName === 'hangup') {
        handleEndMeeting();
      }
    });

    // Conexión WebSocket
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('joinWaitingRoom', { roomName, userId: email });
    });

    socket.on('consultationEnded', handleConsultationEnd);

    return () => {
      socket.off('consultationEnded', handleConsultationEnd);
      socket.disconnect();
      if (apiRef.current && !hasEnded) {
        apiRef.current.dispose();
      }
    };
  }, [isScriptLoaded, roomName, server, displayName, email, role, hasEnded, router]);

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
