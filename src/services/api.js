// src/services/api.js

const BASE_URL = 'https://mt-task.onrender.com';


async function fetchWithErrorHandling(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {

    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}


export async function getBookings({ days = 30, status = 'all', order = 'asc' } = {}) {

  const params = new URLSearchParams({ days, status, order });
  return fetchWithErrorHandling(`/api/bookings?${params.toString()}`);
}


export async function getMetrics(days = 30) {
  return fetchWithErrorHandling(`/api/metrics?days=${days}`);
}

export async function getTrends(months = 6) {
  return fetchWithErrorHandling(`/api/trends?months=${months}`);
}
