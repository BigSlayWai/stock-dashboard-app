// Skeleton loading component for stock cards
// Shows a nice animated placeholder while data is loading

export function StockCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      <div className="h-16 bg-gray-100 rounded -mx-6 -mb-6"></div>
    </div>
  );
}
