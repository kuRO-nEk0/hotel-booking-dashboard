import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  confirmed: '#10b981', // Emerald green
  pending: '#f59e0b',   // Amber orange
  canceled: '#ef4444',  // Rose red
};

export function StatusChart({ bookings }) {
  if (!bookings || bookings.length === 0) return null;


  const statusCounts = bookings.reduce((acc, booking) => {
    // If the status exists in our accumulator, add 1, otherwise set it to 1
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
    value: statusCounts[status],
    color: COLORS[status] || '#94a3b8' // Fallback to gray if status is unknown
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Booking Status</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {/* Map through our data to apply the specific colors to each slice */}
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
