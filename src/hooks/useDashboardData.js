import { useState, useEffect } from 'react';
import { getBookings, getMetrics, getTrends } from '../services/api';

export function useDashboardData() {
  const [data, setData] = useState({ bookings: [], metrics: null, trends: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const [bookingsRes, metricsRes, trendsRes] = await Promise.all([
          getBookings(),
          getMetrics(),
          getTrends()
        ]);

        if (isMounted) {
          // IMPORTANT: The API wraps the actual information inside a `data` property 
          // (e.g., { success: true, data: [...] }). We must extract it here!
          setData({ 
            bookings: bookingsRes.data || [], 
            metrics: metricsRes.data || null, 
            trends: trendsRes.data || [] 
          });
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); 

  return { data, loading, error };
}
