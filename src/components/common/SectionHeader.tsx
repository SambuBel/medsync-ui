import { ReactNode } from 'react';
import ProfileAvatar from '../Profile/ProfileAvatar';
import { User } from '../Profile/ProfilePersonalData';
interface SectionHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
  profileImage?: string;
  setUser?: (user: User) => void;
}

const SectionHeader = ({ title, description, icon, profileImage, setUser }: SectionHeaderProps) => {
  return (
    <div className="bg-white border-b">
      <div className="p-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-2xl">{icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        {/* Avatar siempre visible */}
        {setUser && <ProfileAvatar profileImage={profileImage} setUser={setUser} />}
      </div>
    </div>
  );
};

export default SectionHeader;