"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import ProfileContent from "@/components/Profile/ProfileContent";
import AppointmentModal from "@/components/AppointmentModal";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [appointments, setAppointments] = useState([]);
  const [viewAppointments, setViewAppointments] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/");
      }
      setLoading(false);
    }

    async function fetchAppointments() {
      const res = await fetch("/api/appointments");

      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    }

    fetchProfile();
    fetchAppointments();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!user) return <p className="text-center mt-10">No autorizado</p>;

  return (
    <div className="flex h-screen transition-all duration-300">
      <ProfileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <ProfileContent
        activeTab={activeTab}
        appointments={appointments}
        setViewAppointments={setViewAppointments} setActiveTab={undefined} user={undefined}      />
      {viewAppointments && <AppointmentModal isOpen={viewAppointments} onClose={() => setViewAppointments(false)} />}
    </div>
  );
}
