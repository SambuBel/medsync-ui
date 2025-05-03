import { FaUserMd, FaClock } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import JitsiMeet from '../common/JitsiMeet';
import { User } from '../Profile/ProfilePersonalData';
import { MeetingStatus } from '../common/AppointmentStatusPill';

interface WaitingRoomUser extends User {
  id: string;
}

interface WaitingRoomProps {
  roomName: string;
  user: WaitingRoomUser;
}

export default function WaitingRoom({ roomName, user }: WaitingRoomProps) {
  const [status, setStatus] = useState<'WAITING' | 'IN_PROGRESS'>('WAITING');
  const [waitingTime, setWaitingTime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Contador de tiempo de espera
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime(prev => prev + 1);
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  // Conexión WebSocket
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      withCredentials: true,
      transports: ['websocket']
    });

    const handleConsultationEnd = (data: { roomName: string; emergencyVisitId: string; patientName: string }) => {
      if (data.roomName === roomName) {
        window.location.replace('/profile?tab=record-appointments');
      }
    };

    socket.on('connect', () => {
      console.log('Conectado al WebSocket');
      setIsConnected(true);
      setError(null);
      
      // Unirse a la sala de espera
      socket.emit('joinWaitingRoom', { 
        roomName, 
        userId: user.id 
      });
    });

    socket.on('connect_error', (err) => {
      console.error('Error de conexión:', err);
      setError('Error de conexión con el servidor');
      setIsConnected(false);
    });

    socket.on('joinedWaitingRoom', (data) => {
      console.log('Unido a sala de espera:', data);
    });

    socket.on('doctorJoined', (data) => {
      console.log('Doctor se unió:', data);
      setStatus('IN_PROGRESS');
    });

    socket.on('consultationEnded', handleConsultationEnd);

    return () => {
      socket.off('consultationEnded', handleConsultationEnd);
      socket.disconnect();
    };
  }, [roomName, user.id]);

  const formatWaitingTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (status === MeetingStatus.IN_PROGRESS) {
    return (
      <JitsiMeet
        roomName={roomName}
        server={process.env.NEXT_PUBLIC_JITSI_SERVER as string}
        displayName={`${user.name} ${user.lastName}`}
        email={user.email}
        role={user.role.toLowerCase() as 'patient' | 'moderator'}
        status={status}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        ) : null}
        
        <div className="flex items-center gap-3 mb-6">
          <FaUserMd className="text-3xl text-sky-500" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Sala de Espera
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Por favor, espere mientras un médico se une a la consulta...
          </p>

          <div className="flex items-center gap-2 text-sky-600">
            <FaClock />
            <span>Tiempo de espera: {formatWaitingTime(waitingTime)}</span>
          </div>

          <div className="mt-6 p-4 bg-sky-50 rounded-lg">
            <div className="flex items-center justify-center">
              {isConnected ? (
                <div className="animate-pulse flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Conectado</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">Reconectando...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}