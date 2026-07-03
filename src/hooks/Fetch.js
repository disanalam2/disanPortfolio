import { useState, useEffect } from 'react';
import { apiCall } from '../services/api';
import { useRefresh } from '../context/RefreshContext';

export const useFetch = (endpoint, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall(endpoint);
        // Note: Check if result has success flag or returns data directly
        // Aapke purane code me GET requests direct array/object return kar rahi thi
        setData(result);
      } catch (err) {
        console.error(`❌ Error fetching data from ${endpoint}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) fetchData();
  }, [endpoint, refreshKey]);

  return { data, setData, loading, error };
};