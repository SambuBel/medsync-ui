import { useState, ReactNode } from "react";

interface CollapsibleCardProps {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

const CollapsibleCard = ({
  title,
  icon,
  defaultOpen = false,
  children,
}: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapse collapse-arrow bg-white rounded-lg shadow-md border border-gray-200">
      <input
        type="checkbox"
        className="peer hidden"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div
        className="collapse-title flex items-center gap-3 cursor-pointer p-4 text-xl font-medium text-gray-800 bg-gray-100 rounded-t-lg peer-checked:rounded-b-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="text-blue-500">{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="collapse-content px-6 py-2 bg-white transition-all duration-300 gap-4 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default CollapsibleCard;
