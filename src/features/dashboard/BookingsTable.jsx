import { useState } from 'react';

export function BookingsTable({ bookings }) {
  // 1. Controlled Inputs State
  // ahh okay using state to track exactly what the user has typed or selected in the filters.
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Guard clause: Don't try to render or filter until the data has actually loaded
  if (!bookings || bookings.length === 0) return null;

  // 2. Derived State for Filtering
  // I am not using useState for this filtered list. 
  // I am just calculating it on the fly every time the component renders. 
  // If `searchTerm` or `statusFilter` changes, React re-renders this component, 
  // and this `.filter()` runs again, giving us a fresh list instantly.
  const filteredBookings = bookings.filter(booking => {
    // Check if it matches the dropdown status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    // Check if the guest's name includes the search term (case-insensitive)
    const matchesSearch = booking.guestName
      ? booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      {/* --- Table Header & Filter Controls --- */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold text-slate-800">Recent Bookings</h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Controlled Input: Text Search */}
          <input
            type="text"
            placeholder="Search guests..."
            value={searchTerm} // Locked to state
            onChange={(e) => setSearchTerm(e.target.value)} // Updates state on keystroke
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral w-full sm:w-64"
          />

          {/* Controlled Input: Dropdown Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* --- The Data Table --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">Guest</th>
              <th className="px-6 py-4">Room Type</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{booking.guestName || 'Unknown'}</td>
                  <td className="px-6 py-4">{booking.roomType}</td>
                  <td className="px-6 py-4">{booking.checkIn}</td>
                  <td className="px-6 py-4">{booking.checkOut}</td>
                  <td className="px-6 py-4">
                    {/* Dynamic styling badge based on status */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                      ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">${booking.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  No bookings found matching your filters. Try adjusting your search!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
