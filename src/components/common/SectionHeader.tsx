import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-lg border-b pb-4 mb-4">
      <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}