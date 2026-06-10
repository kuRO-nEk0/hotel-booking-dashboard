import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TrendsChart({ trends }) {
  if (!trends || trends.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Booking Trends</h3>
      
      <div className="h-72">
        {/* ResponsiveContainer allows the chart to shrink and grow with the window size */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            
            {/* Recharts automatically scales the axes based on the dynamic data provided! */}
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            {/* The line plots the 'bookings' property from our data objects */}
            <Line 
              type="monotone" 
              dataKey="bookings" 
              stroke="var(--color-brand-coral)" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, fill: "var(--color-brand-coral)" }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
