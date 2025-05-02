import { ReactNode } from 'react';
import { User } from '../Profile/ProfilePersonalData';
import ProfileAvatar from '../Profile/ProfileAvatar';

interface SectionHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  profileImage?: string;
  setUser?: (user: User) => void;
  children?: React.ReactNode;
  name?: string;
  lastName?: string;
}

const SectionHeader = ({ title, description, icon, profileImage, setUser, children, name, lastName }: SectionHeaderProps) => {
  return (
    <div className="bg-white border-b w-full">
      <div className="flex items-center justify-between w-full gap-8 pb-4">
        <div className="flex items-center gap-4 flex-1">
          {icon && <span className="text-3xl">{icon}</span>}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        {children && (
          <div className="flex flex-col items-end gap-2 min-w-[120px]">{children}</div>
        )}
        <div className="flex flex-col items-center rounded-xl px-6 py-4 min-w-[140px] ml-4">
          {setUser && <ProfileAvatar profileImage={profileImage} setUser={setUser} />}
          {(name || lastName) && (
            <span className="mt-3 font-semibold text-sky-800 text-base text-center">
              {[name, lastName].filter(Boolean).join(" ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;