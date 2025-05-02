import { ReactNode } from 'react';
import { User } from '../Profile/ProfilePersonalData';
import ProfileAvatar from '../Profile/ProfileAvatar';

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
  profileImage?: string;
  setUser?: (user: User) => void;
  children?: React.ReactNode;
}

const SectionHeader = ({ title, description, icon, profileImage, setUser, children }: SectionHeaderProps) => {
  return (
    <div className="bg-white border-b w-full">
      <div className="p-1 flex justify-between items-start w-full gap-6 items-center">
        <div className="flex items-center gap-4">
          <span className="text-2xl">{icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {children && <div className="self-center">{children}</div>}
          {setUser && <ProfileAvatar profileImage={profileImage} setUser={setUser} />}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;