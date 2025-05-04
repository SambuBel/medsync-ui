"use client";
import { useState, useEffect, Suspense } from "react";
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
  }, [activeTab, searchParams]);

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

  const setActiveTabAndUrl = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (loading) return <LoadingComponent />;
  if (!user) return <p className="text-center mt-10">No autorizado</p>;

  return (
    <div className="flex h-screen transition-all duration-300 min-w-0">
      <div
        className={`transition-all duration-300 ${isCollapsed ? "w-20 overflow-y-hidden overflow-x-hidden" : "w-64 overflow-y-auto overflow-x-hidden"} h-screen flex-shrink-0`}
      >
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTabAndUrl}
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          role={user.role}
        />
      </div>
      <main className="flex-1 min-h-screen overflow-y-auto bg-gray-50">
        <div className="overflow-x-auto rounded-lg shadow border border-gray-100 bg-white mt-6 scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-sky-50">
          <Suspense fallback={<div>Cargando...</div>}>
            <ProfileContent
              activeTab={activeTab}
              appointments={appointments}
              emergencyVisits={emergencies}
              user={user}  setUser={setUser}
              setActiveTab={setActiveTabAndUrl}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
