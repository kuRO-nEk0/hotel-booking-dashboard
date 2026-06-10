import { MetricCard } from '../../components/MetricCard';

export function MetricsSummary({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <MetricCard 
        title="Total Revenue" 
        value={`$${metrics.totalRevenue?.toLocaleString() || 0}`} 
      />
      <MetricCard 
        title="Total Bookings" 
        value={metrics.totalBookings?.toLocaleString() || 0} 
      />
      <MetricCard 
        title="Occupancy Rate" 
        value={`${metrics.occupancyRate || 0}%`} 
      />
      <MetricCard 
        title="Avg Booking Value" 
        value={`$${metrics.averageBookingValue?.toLocaleString() || 0}`} 
      />
    </div>
  );
}
