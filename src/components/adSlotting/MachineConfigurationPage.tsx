import MachineConfigurationTab from './MachineConfigurationTab';

export default function MachineConfigurationPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-gray-900 mb-2">Machine Configuration</h1>
          <p className="text-gray-600">
            Configure machine start/stop times and peak window setup
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <MachineConfigurationTab />
      </div>
    </div>
  );
}
