import { Suspense } from "react";
import ProfilePage from "@/components/Profile/ProfilePage";

export default function ProfilePageWrapper() {
  return (
    <Suspense fallback={<div>Cargando perfil...</div>}>
      <main className="flex-1 min-h-screen overflow-x-hidden overflow-y-auto bg-gray-50">
        <ProfilePage />
      </main>
    </Suspense>
  );
}
