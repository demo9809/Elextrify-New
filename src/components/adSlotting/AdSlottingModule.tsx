import { useState } from 'react';
import { Grid3x3, Settings, Monitor } from 'lucide-react';
import InventoryOverview from './InventoryOverview';
import SlotConfigurationTab from './SlotConfigurationTab';
import MachineConfigurationTab from './MachineConfigurationTab';

type TabType = 'inventory' | 'slot-config' | 'machine-config';

export default function AdSlottingModule() {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  const tabs = [
    {
      id: 'inventory' as TabType,
      label: 'Inventory Overview',
      icon: <Grid3x3 className="w-4 h-4" />,
    },
    {
      id: 'slot-config' as TabType,
      label: 'Slot Configuration',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'machine-config' as TabType,
      label: 'Machine Configuration',
      icon: <Monitor className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-gray-900 mb-2">Ad Slotting & Scheduling</h1>
          <p className="text-gray-600">
            Manage sellable inventory, configure slot structures, and control machine operations
          </p>
        </div>

        {/* System-Level Tabs */}
        <div className="px-8">
          <div className="flex gap-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 h-12 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#D9480F] text-[#D9480F]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'inventory' && <InventoryOverview />}
        {activeTab === 'slot-config' && <SlotConfigurationTab />}
        {activeTab === 'machine-config' && <MachineConfigurationTab />}
      </div>
    </div>
  );
}
