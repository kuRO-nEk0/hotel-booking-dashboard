import { useState, useMemo } from 'react';

// Helper to extract initials
const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

// Helper for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export function BookingsTable({ bookings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [hotelFilter, setHotelFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('checkin_asc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  if (!bookings || bookings.length === 0) return null;

  // Extract unique hotels and rooms for dropdowns
  const uniqueHotels = [...new Set(bookings.map(b => b.hotelName))].filter(Boolean);
  const uniqueRooms = [...new Set(bookings.map(b => b.roomType))].filter(Boolean);

  // Filter & Sort Logic
  const processedBookings = useMemo(() => {
    // 1. Filter
    let filtered = bookings.filter(booking => {
      const matchesSearch = searchTerm === '' || 
        (booking.guestName && booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.id && booking.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.hotelName && booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;
      const matchesHotel = hotelFilter === 'all' || booking.hotelName === hotelFilter;
      const matchesRoom = roomFilter === 'all' || booking.roomType === roomFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesHotel && matchesRoom;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (sortOrder === 'checkin_asc') return new Date(a.checkIn) - new Date(b.checkIn);
      if (sortOrder === 'checkin_desc') return new Date(b.checkIn) - new Date(a.checkIn);
      if (sortOrder === 'value_desc') return b.amount - a.amount;
      if (sortOrder === 'value_asc') return a.amount - b.amount;
      return 0;
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, paymentFilter, hotelFilter, roomFilter, sortOrder]);

  // 3. Paginate
  const totalItems = processedBookings.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  
  // Ensure current page is valid if filters change
  if (currentPage > totalPages) setCurrentPage(1);

  const paginatedBookings = processedBookings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setHotelFilter('all');
    setRoomFilter('all');
    setSortOrder('checkin_asc');
    setCurrentPage(1);
  };

  // formatting dates (e.g. "10 Jun 2026")
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-slate-200 overflow-hidden mt-8">
      
      {/* FILTER BAR TOP ROW */}
      <div className="p-4 border-b border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 relative">
          <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search guest, hotel or booking ID"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
          />
        </div>
        
        <div className="md:col-span-2">
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white">
            <option value="all">All statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white">
            <option value="all">All payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <select value={hotelFilter} onChange={(e) => { setHotelFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white">
            <option value="all">All hotels</option>
            {uniqueHotels.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
      </div>

      {/* FILTER BAR BOTTOM ROW */}
      <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50 gap-4">
        <div className="text-sm text-slate-500">
          {totalItems} matches of {bookings.length}
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Room</span>
            <select value={roomFilter} onChange={(e) => { setRoomFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-1 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white min-w-[120px]">
              <option value="all">All rooms</option>
              {uniqueRooms.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort</span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-3 py-1 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 bg-white min-w-[150px]">
              <option value="checkin_asc">Check-in: soonest</option>
              <option value="checkin_desc">Check-in: latest</option>
              <option value="value_desc">Highest value</option>
              <option value="value_asc">Lowest value</option>
            </select>
          </div>

          <button onClick={handleReset} className="text-sm text-slate-500 hover:text-slate-800 underline ml-2">
            Reset
          </button>
        </div>
      </div>

      {/* MINIMAL TABLE DESIGN */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Guest</th>
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Stay</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 font-medium text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  
                  {/* GUEST */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs shrink-0">
                        {getInitials(booking.guestName)}
                      </div>
                      <div>
                        <div className="text-slate-800 font-medium">{booking.guestName || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{booking.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* PROPERTY */}
                  <td className="px-6 py-4">
                    <div className="text-slate-800 font-medium">{booking.hotelName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {booking.roomType}
                    </div>
                  </td>

                  {/* STAY */}
                  <td className="px-6 py-4">
                    <div className="text-slate-800">{formatDate(booking.checkIn)}</div>
                    <div className="text-xs text-slate-500 mt-0.5">to {formatDate(booking.checkOut)}</div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs
                      ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                        booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${booking.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </div>
                  </td>

                  {/* VALUE */}
                  <td className="px-6 py-4 text-slate-800 font-medium text-right">
                    {formatCurrency(booking.amount)}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center text-slate-500">
                  <div className="text-slate-700 font-medium">No bookings found</div>
                  <div className="text-sm mt-1">Try adjusting your filters.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      {totalPages > 0 && (
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems}
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:bg-transparent"
            >
              Prev
            </button>
            
            <div className="flex">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 text-sm border-y border-r first:border-l border-slate-200 ${
                    currentPage === i + 1 
                      ? 'bg-slate-800 text-white border-slate-800' 
                      : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:bg-transparent ml-1"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
