import { useDashboardData } from '../../hooks/useDashboardData';
import { MetricsSummary } from './MetricsSummary';
import { TrendsChart } from './TrendsChart';
import { StatusChart } from './StatusChart';
import { BookingsTable } from './BookingsTable';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { ErrorMessage } from '../../components/ErrorMessage';

export function Dashboard() {
  // 1. Consume our custom hook from Session 3!
  const { data, loading, error } = useDashboardData();

  // 2. Error State UI: If the fetch failed, show our friendly error component
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  // 3. Main Layout
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Responsive Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/favicon.jpg" alt="My Travaly Logo" className="w-8 h-8 object-contain rounded-md" />
            <span className="font-bold text-xl text-slate-800 hidden sm:block">Admin Panel</span>
          </div>

        </div>
      </nav>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Analytics Overview</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Track your hotel's performance and recent bookings.</p>
        </header>

        {/* 4. Loading State UI vs Success State UI */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {/* The actual dashboard components assembled together! */}
            <MetricsSummary metrics={data.metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <TrendsChart trends={data.trends} />
              <StatusChart bookings={data.bookings} />
            </div>

            <BookingsTable bookings={data.bookings} />
          </>
        )}

      </div>
    </div>
  );
}
