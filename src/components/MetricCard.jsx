export function MetricCard({ title, value, change }) {
  // Determine if the trend is positive or negative for styling
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-2">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        
        {/* We only render the change indicator if a change value was provided */}
        {change !== undefined && (
          <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  );
}
