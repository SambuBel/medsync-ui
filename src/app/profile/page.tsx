"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import ProfileContent from "@/components/Profile/ProfileContent";
import LoadingComponent from "@/components/Profile/LoadingComponent";
import { User } from "@/components/Profile/ProfilePersonalData";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return searchParams.get("tab") || localStorage.getItem("activeTab") || "home";
    }
    return "home";
  });

  const [appointments, setAppointments] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

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

    async function fetchConsultations() {
      const res = await fetch("/api/consultations");
      if (res.ok) {
        const { appointments, emergencyVisits } = await res.json();
        setAppointments(appointments);
        setEmergencies(emergencyVisits);
      }
    }

    fetchProfile();
    fetchConsultations();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) return <LoadingComponent />;
  if (!user) return <p className="text-center mt-10">No autorizado</p>;

  return (
    <div className="flex h-screen transition-all duration-300">
      <div className="w-64 h-screen overflow-y-auto flex-shrink-0">
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          role={user.role}
        />
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <ProfileContent
          activeTab={activeTab}
          appointments={appointments}
          emergencyVisits={emergencies}
          user={user}  setUser={setUser}
          setActiveTab={setActiveTab}
        />
      </main>
    </div>
  );
}
