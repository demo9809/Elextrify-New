import InventoryOverview from './InventoryOverview';

export default function InventoryOverviewPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-gray-900 mb-2">Inventory Overview</h1>
          <p className="text-gray-600">
            View machine-level sellable slot availability
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <InventoryOverview />
      </div>
    </div>
  );
}
