// src/components/common/CustomTabs.tsx
interface TabItem {
    id: string;
    label: string;
    count?: number;
  }
  
  interface CustomTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
  }
  
  export default function CustomTabs({ tabs, activeTab, onTabChange }: CustomTabsProps) {
    return (
      <div className="flex gap-2 p-1 bg-gray-100/50 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
              ${activeTab === tab.id 
                ? 'bg-sky-500 text-white shadow-md' 
                : 'hover:bg-sky-50 text-gray-600 hover:text-sky-600'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${activeTab === tab.id 
                  ? 'bg-sky-400 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }