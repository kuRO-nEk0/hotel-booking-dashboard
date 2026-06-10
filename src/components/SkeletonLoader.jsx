export function SkeletonLoader() {
  return (
    // 'animate-pulse' - soft fading effect to look cool
    <div className="w-full animate-pulse space-y-8 mt-8">

      {/* 1. Metrics Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
        ))}
      </div>

      {/* 2. Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Skeleton (takes up 2 columns) */}
        <div className="lg:col-span-2 h-[350px] bg-slate-200 rounded-xl"></div>
        {/* Pie Chart Skeleton (takes up 1 column) */}
        <div className="col-span-1 h-[350px] bg-slate-200 rounded-xl"></div>
      </div>

      {/* 3. Table Skeleton */}
      <div className="h-96 bg-slate-200 rounded-xl"></div>
    </div>
  );
}
