import React, { useState } from 'react';

interface TabContent {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

interface ProductTabsProps {
  tabs: TabContent[];
  children: React.ReactNode[];
  defaultTabId?: string;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  tabs,
  children,
  defaultTabId,
}) => {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id || ''
  );

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTabId);
  const activeContent = children[activeTabIndex];

  return (
    <div className="w-full">
      {/* Tab List */}
      <div className="border-b border-neutral-300">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-3 font-semibold text-sm whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeTabId === tab.id
                  ? 'text-primary-600 border-primary-600'
                  : 'text-neutral-600 border-transparent hover:text-primary-600'
              }`}
              aria-selected={activeTabId === tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div
        className="py-6 animate-fadeIn"
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
      >
        {activeContent}
      </div>
    </div>
  );
};
